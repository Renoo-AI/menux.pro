import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import type { MenuItem } from "../types/menu";

export const menuService = {
  getMenuItems: async (restaurantId: string): Promise<MenuItem[]> => {
    try {
      const q = query(
        collection(db, "restaurants", restaurantId, "menuItems"),
        where("available", "==", true),
        orderBy("sortOrder", "asc")
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[];
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  },
};
