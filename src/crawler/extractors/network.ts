import type { Page } from 'playwright';

export interface CapturedRequest {
  method: string;
  url: string;
  status?: number;
  contentType?: string;
}

export function setupNetworkCapture(page: Page): () => CapturedRequest[] {
  const captured: CapturedRequest[] = [];
  const pending = new Map<string, CapturedRequest>();

  page.on('request', (req) => {
    if (!['xhr', 'fetch'].includes(req.resourceType())) return;
    pending.set(req.url(), { method: req.method(), url: req.url() });
  });

  page.on('response', (res) => {
    const entry = pending.get(res.url());
    if (!entry) return;
    entry.status = res.status();
    entry.contentType = res.headers()['content-type'];
    captured.push(entry);
    pending.delete(res.url());
  });

  return () => [...captured, ...pending.values()];
}
