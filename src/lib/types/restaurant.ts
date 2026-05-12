import { Timestamp } from "firebase/firestore";

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  ownerId: string;
  logoUrl?: string;
  coverUrl?: string;
  phone?: string;
  address?: string;
  country: "TN" | "QA" | "OTHER";
  currency: "TND" | "QAR" | "EUR" | "USD";
  languageDefault: "fr" | "ar" | "en";
  enabledLanguages: Array<"fr" | "ar" | "en">;
  status: "active" | "paused" | "trial" | "blocked";
  plan: "free" | "basic" | "pro" | "max";
  branding: {
    primaryColor: string;
    accentColor: string;
    fontStyle: "modern" | "classic" | "premium";
    hideMenuxBranding: boolean;
  };
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
