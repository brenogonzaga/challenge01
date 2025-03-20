export interface NormalizeOptions {
  removeAccents?: boolean;
  toLowerCase?: boolean;
  replaceHyphens?: boolean;
  stopwords?: string[];
  unitMappings?: { [unit: string]: string[] };
  unitConversions?: { [sourceUnit: string]: { [targetUnit: string]: number } };
  sortTokens?: boolean;
  synonymMapping?: { [key: string]: string };
}

export interface Product {
  id: number;
  title: string;
  supermarket: string;
  price: number;
}

export interface CategorizedProduct {
  title: string;
  supermarket: string;
}

export interface Category {
  category: string;
  count: number;
  products: CategorizedProduct[];
}
