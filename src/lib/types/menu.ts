import { Timestamp } from "firebase/firestore";

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: {
    fr?: string;
    ar?: string;
    en?: string;
  };
  description?: {
    fr?: string;
    ar?: string;
    en?: string;
  };
  price: number;
  imageUrl?: string;
  categoryId: string;
  available: boolean;
  featured: boolean;
  sortOrder: number;
  allergens?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Category = {
  id: string;
  restaurantId: string;
  name: {
    fr?: string;
    ar?: string;
    en?: string;
  };
  sortOrder: number;
};
