export type DrinkCategory = 'cocktails' | 'wine' | 'beer' | 'mocktails';

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DrinkCategory;
  image: string;
  popular?: boolean;
}

export interface Category {
  id: DrinkCategory;
  name: string;
  icon: any; // LucideIcon type
}