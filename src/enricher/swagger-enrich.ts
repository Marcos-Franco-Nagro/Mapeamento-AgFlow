import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

const SWAGGER_URL = 'https://api.agflow.agrisk.dev/api-json';
const VAULT_ENDPOINTS = path.join('vault', 'endpoints');
const API_BASE = 'https://api.agflow.agrisk.dev';

// ─── Tipos do OpenAPI ────────────────────────────────────────────────────────

interface OpenAPISpec {
  paths: Record<string, Record<string, Operation>>;
  components?: { schemas?: Record<string, Schema> };
}

interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: { content?: Record<string, { schema?: Schema }> };
  responses?: Record<string, { description?: string; content?: Record<string, { schema?: Schema }> }>;
  tags?: string[];
}

interface Parameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: Schema;
}

interface Schema {
  type?: string;
  $ref?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  description?: string;
  required?: string[];
  enum?: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveRef(schema: Schema, components: OpenAPISpec['components'], depth = 0): Schema {
  if (!schema.$ref || depth > 3) return schema;
  const refName = schema.$ref.split('/').pop()!;
  const resolved = components?.schemas?.[refName] ?? schema;
  return resolved.$ref ? resolveRef(resolved, components, depth + 1) : resolved;
}

function matchPath(concretePath: string, swaggerPath: string): boolean {
  const cp = concretePath.split('/').filter(Boolean);
  const sp = swaggerPath.split('/').filter(Boolean);
  if (cp.length !== sp.length) return false;
  return sp.every((part, i) => part.startsWith('{') || part === cp[i]);
}

function renderSchemaTable(schema: Schema, components: OpenAPISpec['components']): string {
  const resolved = schema.$ref ? resolveRef(schema, components) : schema;
  if (resolved.type !== 'object' || !resolved.properties) return '';

  const required = new Set(resolved.required ?? []);
  const rows = Object.entries(resolved.properties).map(([name, prop]) => {
    const r = prop.$ref ? resolveRef(prop, components) : prop;
    const type = r.type ?? (r.$ref ? r.$ref.split('/').pop() : 'object') ?? '?';
    const req = required.has(name) ? '✓' : '';
    const desc = r.description ?? '';
    return `| \`${name}\` | ${type} | ${req} | ${desc} |`;
  });

  if (rows.length === 0) return '';
  return `| Campo | Tipo | Obrigatório | Descrição |\n|-------|------|-------------|----------|\n${rows.join('\n')}`;
}

function buildSwaggerSection(op: Operation, components: OpenAPISpec['components']): string {
  const lines: string[] = ['\n---\n\n## Swagger\n'];

  if (op.operationId) lines.push(`**Operação:** \`${op.operationId}\``);
  if (op.summary)     lines.push(`\n**Resumo:** ${op.summary}`);
  if (op.description) lines.push(`\n**Descrição:** ${op.description}`);

  // Parâmetros (exclui ag-flow-id que é infraestrutura interna)
  const params = (op.parameters ?? []).filter(p => p.name !== 'ag-flow-id');
  if (params.length > 0) {
    lines.push('\n### Parâmetros\n');
    lines.push('| Nome | Local | Tipo | Obrigatório | Descrição |');
    lines.push('|------|-------|------|-------------|-----------|');
    for (const p of params) {
      const type = p.schema?.type ?? '?';
      const req  = p.required ? '✓' : '';
      lines.push(`| \`${p.name}\` | ${p.in} | ${type} | ${req} | ${p.description ?? ''} |`);
    }
  }

  // Request body
  const bodySchema = op.requestBody?.content?.['application/json']?.schema;
  if (bodySchema) {
    lines.push('\n### Request Body\n');
    const table = renderSchemaTable(
      bodySchema.$ref ? resolveRef(bodySchema, components) : bodySchema,
      components,
    );
    if (table) lines.push(table);
  }

  // Response
  const res = op.responses?.['200'] ?? op.responses?.['201'];
  if (res) {
    const label = res.description ? ` — ${res.description}` : '';
    lines.push(`\n### Response${label}\n`);
    const resSchema = res.content?.['application/json']?.schema;
    if (resSchema) {
      const table = renderSchemaTable(
        resSchema.$ref ? resolveRef(resSchema, components) : resSchema,
        components,
      );
      if (table) lines.push(table);
    }
  }

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function findMdFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  try {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) files.push(...await findMdFiles(full));
      else if (entry.name.endsWith('.md')) files.push(full);
    }
  } catch { /* dir não existe */ }
  return files;
}

async function main() {
  console.log('Baixando spec do Swagger...');
  const res = await fetch(SWAGGER_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar Swagger`);
  const spec = await res.json() as OpenAPISpec;
  console.log(`✓ ${Object.keys(spec.paths).length} endpoints no Swagger.`);

  console.log('\nEscaneando vault/endpoints...');
  const mdFiles = await findMdFiles(VAULT_ENDPOINTS);
  console.log(`✓ ${mdFiles.length} arquivos .md encontrados.\n`);

  let enriched = 0;
  let skipped  = 0;
  let noMatch  = 0;

  for (const filePath of mdFiles) {
    const content = await fs.readFile(filePath, 'utf-8');

    if (content.includes('## Swagger')) { skipped++; continue; }

    const urlMatch    = content.match(/^url:\s*"(.+)"/m);
    const methodMatch = content.match(/^method:\s*(\w+)/m);
    if (!urlMatch || !methodMatch) { noMatch++; continue; }

    const rawUrl = urlMatch[1];
    const method = methodMatch[1].toLowerCase();

    if (!rawUrl.startsWith(API_BASE)) { noMatch++; continue; }

    const urlPath = new URL(rawUrl).pathname;

    let matchedOp: Operation | null = null;
    for (const [swaggerPath, methods] of Object.entries(spec.paths)) {
      if (matchPath(urlPath, swaggerPath) && methods[method]) {
        matchedOp = methods[method];
        break;
      }
    }

    if (!matchedOp) { noMatch++; continue; }

    const enriched_content = content.trimEnd() + buildSwaggerSection(matchedOp, spec.components) + '\n';
    await fs.writeFile(filePath, enriched_content, 'utf-8');
    enriched++;
  }

  console.log(`✅ Concluído:`);
  console.log(`   ${enriched} arquivo(s) enriquecido(s) com dados do Swagger`);
  console.log(`   ${skipped}  arquivo(s) já enriquecidos anteriormente (ignorados)`);
  console.log(`   ${noMatch}  arquivo(s) sem match (URLs de front-end ou não mapeadas)`);
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
