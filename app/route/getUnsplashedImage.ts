type UnsplashImage = {
  alt_description: string | null;
  description: string | null;
  urls: {
    regular: string;
  };
};

export async function getUnsplashImage(query: string) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&content_filter=high&orientation=landscape&lang=fr&order_by=relevant&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Erreur Unsplash");
    return null;
  }

  const data = await res.json();

  const results = data.results as UnsplashImage[];

  const filtered = results.find((img) => {
    const desc = `${img.alt_description || ''} ${img.description || ''}`.toLowerCase();
    return (
      desc.includes("dish") ||
      desc.includes("meal") ||
      desc.includes("food") ||
      desc.includes("plat") ||
      desc.includes("recette") ||
      desc.includes("cooked") ||
      desc.includes("cuisine")
    );
  });

  return filtered?.urls?.regular || results[0]?.urls?.regular || "panda.svg";
}
