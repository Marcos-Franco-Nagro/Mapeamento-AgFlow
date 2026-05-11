import { normalizeUrl } from '../utils/url.js';

export class CrawlQueue {
  private readonly visited = new Set<string>();
  private readonly pending: string[] = [];

  enqueue(url: string): void {
    const key = normalizeUrl(url);
    if (!this.visited.has(key)) {
      this.visited.add(key);
      this.pending.push(url);
    }
  }

  // Recoloca uma URL já visitada na fila (usado após re-autenticação)
  requeue(url: string): void {
    this.pending.unshift(url);
  }

  dequeue(): string | undefined {
    return this.pending.shift();
  }

  isEmpty(): boolean {
    return this.pending.length === 0;
  }

  get visitedCount(): number {
    return this.visited.size;
  }
}
