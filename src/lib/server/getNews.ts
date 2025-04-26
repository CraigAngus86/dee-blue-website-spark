
export async function getNews() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
}
