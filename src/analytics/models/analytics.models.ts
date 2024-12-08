import { AnalyticsContract } from "../interfaces/analytics.interface";

export const AnaltyticsContract: AnalyticsContract = {
  qualAnalytics: [
    { name: "elements_created_at", type: "application/json" },
    { name: "elements_content", type: "application/json" },
  ],
  quantAnalytics: [{ name: "elements_count", type: "integer" }],
};
