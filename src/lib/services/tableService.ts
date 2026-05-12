import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { RestaurantTable } from "../types/table";

export const tableService = {
  getTables: async (restaurantId: string): Promise<RestaurantTable[]> => {
    try {
      const q = query(collection(db, "restaurants", restaurantId, "tables"));

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RestaurantTable[];
    } catch (error) {
      console.error("Error fetching tables:", error);
      return [];
    }
  },
};
