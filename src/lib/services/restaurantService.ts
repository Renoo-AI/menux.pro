import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Restaurant } from "../types/restaurant";

export const restaurantService = {
  getRestaurantBySlug: async (slug: string): Promise<Restaurant | null> => {
    try {
      const q = query(collection(db, "restaurants"), where("slug", "==", slug));
      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      if (!doc) return null;

      return { id: doc.id, ...doc.data() } as Restaurant;
    } catch (error) {
      console.error("Error fetching restaurant by slug:", error);
      return null;
    }
  },
};
