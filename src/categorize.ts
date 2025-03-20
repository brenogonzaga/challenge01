import { Product, Category, NormalizeOptions } from "./interfaces";
import { normalizeString } from "./normalize";

export function categorizeProducts(
  products: Product[],
  options: NormalizeOptions = {}
): Category[] {
  const categories: { [key: string]: Category } = {};

  products.forEach((product) => {
    const key = normalizeString(product.title, options);

    if (!categories[key]) {
      categories[key] = {
        category: product.title,
        count: 0,
        products: [],
      };
    }

    categories[key].count++;
    categories[key].products.push({
      title: product.title,
      supermarket: product.supermarket,
    });
  });

  return Object.values(categories);
}
