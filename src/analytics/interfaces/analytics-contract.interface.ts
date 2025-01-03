import {Metric} from "../entities/analytics.entity";

export interface AnalyticsContract {
    qualAnalytics: Metric[];
    quantAnalytics: Metric[];
}