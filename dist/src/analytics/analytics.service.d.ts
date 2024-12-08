import { AnalyticsActivity } from "./interfaces/analytics.interface";
export declare class AnalyticsService {
    private readonly analyticsContract;
    private activities;
    findOne(id: string): AnalyticsActivity | undefined;
    getContract(): import("./interfaces/analytics.interface").AnalyticsContract;
}
