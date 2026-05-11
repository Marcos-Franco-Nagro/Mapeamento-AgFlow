export function slugify(url: string): string {
  return (
    url
      .replace(/^https?:\/\/[^/]+/, '')
      .replace(/^\//, '')
      .replace(/\//g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'root'
  );
}
