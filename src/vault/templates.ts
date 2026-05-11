export interface RotaFrontmatter {
  url: string;
  path: string;
  titulo: string;
  'ultima-visita': string;
  'versao-frontend': string;
  tags: string[];
}

export function buildRotaFrontmatter(params: {
  url: string;
  path: string;
  title: string;
  crawledAt: string;
}): RotaFrontmatter {
  return {
    url: params.url,
    path: params.path,
    titulo: params.title,
    'ultima-visita': params.crawledAt.slice(0, 10),
    'versao-frontend': process.env.FRONTEND_VERSION ?? 'v2.313.0',
    tags: ['rota', 'agflow'],
  };
}

export function frontmatterToYaml(obj: Record<string, unknown>): string {
  const lines = Object.entries(obj).map(([k, v]) => {
    if (Array.isArray(v)) return `${k}: [${(v as string[]).join(', ')}]`;
    return `${k}: ${String(v)}`;
  });
  return `---\n${lines.join('\n')}\n---`;
}
