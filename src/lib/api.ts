export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not set in the environment variables');
  }


  const url = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API fetch failed for ${path}: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}
