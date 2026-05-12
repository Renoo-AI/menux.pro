import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { ActivityLog } from "../types/log";

export const logService = {
  getLogs: async (restaurantId: string, maxResults = 50): Promise<ActivityLog[]> => {
    const logsRef = collection(db, "restaurants", restaurantId, "logs");
    const q = query(logsRef, orderBy("createdAt", "desc"), limit(maxResults));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ActivityLog[];
  },
};
