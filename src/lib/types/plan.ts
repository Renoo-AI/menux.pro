export type PlanType = "free" | "basic" | "pro" | "max";

export type Plan = {
  id: PlanType;
  name: string;
  priceTND: number;
  features: {
    maxMenuItems: number;
    maxTables: number;
    maxStaff: number;
    waiterAccounts: number;
    customBranding: boolean;
    advancedAnalytics: boolean;
    watermarkRequired: boolean;
  };
};

export const PLAN_LIMITS: Record<PlanType, Plan['features']> = {
  free: {
    maxMenuItems: 8,
    maxTables: 5,
    maxStaff: 1,
    waiterAccounts: 0,
    customBranding: false,
    advancedAnalytics: false,
    watermarkRequired: true,
  },
  basic: {
    maxMenuItems: 40,
    maxTables: 20,
    maxStaff: 3,
    waiterAccounts: 1,
    customBranding: true,
    advancedAnalytics: false,
    watermarkRequired: true,
  },
  pro: {
    maxMenuItems: Infinity,
    maxTables: Infinity,
    maxStaff: 15,
    waiterAccounts: 10,
    customBranding: true,
    advancedAnalytics: true,
    watermarkRequired: false,
  },
  max: {
    maxMenuItems: Infinity,
    maxTables: Infinity,
    maxStaff: Infinity,
    waiterAccounts: Infinity,
    customBranding: true,
    advancedAnalytics: true,
    watermarkRequired: false,
  },
};
