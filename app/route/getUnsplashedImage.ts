// app/route/getUnsplashImage.ts
export async function getUnsplashImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (!res.ok) {
    console.error("Erreur Unsplash");
    return null;
  }

  const data = await res.json();
  return data.results[0]?.urls?.regular || null;
}
