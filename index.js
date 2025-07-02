const axios=require("axios")

async function fetchAmulProducts() {
  const response = await axios.get("https://world.openfoodfacts.org/brand/amul.json");
  const all = response.data.products;

  const formatted = all
    .filter(p => p.image_url && p.product_name)
    .map(p => ({
      name: p.product_name,
      brand: p.brands || "Unknown",
      category: p.categories?.split(',')[0]?.trim() || "General",
      price: Math.floor(Math.random() * 150) + 50,
      stock: Math.floor(Math.random() * 100) + 10,
      description: p.generic_name || "Product from Open Food Facts",
      imageUrl: p.image_url
    }));

  console.log(formatted.slice(0, 10));
}

fetchAmulProducts()