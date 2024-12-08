import { Activity } from "src/activity/interfaces/activity.interface";
import { AnalyticsService } from "./analytics.service";
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    analytics(activity: Activity): import("./interfaces/analytics.interface").AnalyticsActivity;
    getContract(): import("./interfaces/analytics.interface").AnalyticsContract;
}
