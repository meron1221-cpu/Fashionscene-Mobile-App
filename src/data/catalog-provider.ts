import rawCatalog from "./catalog.json";
import type { Catalog, Category, Product, Promo } from "./types";

export const dummyCatalog: Catalog = {
  categories: rawCatalog.categories as Category[],
  promos: rawCatalog.promos as Promo[],
  products: rawCatalog.products as Product[],
};

export function getDummyCatalog(): Catalog {
  return dummyCatalog;
}

export async function getCatalog(): Promise<Catalog> {
  return dummyCatalog;
}
