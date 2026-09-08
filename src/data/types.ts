export type CategoryId =
  "all" | "women" | "men" | "kids" | "shoes" | "accessories" | "sale";

export type Product = {
  id: string;
  name: string;
  category: Exclude<CategoryId, "all" | "sale">;
  sizes: string[];
  colors: string[];
  price: number;
  salePrice: number | null;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
};

export type Category = {
  id: CategoryId;
  label: string;
};

export type Promo = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
};

export type Catalog = {
  categories: Category[];
  promos: Promo[];
  products: Product[];
};
