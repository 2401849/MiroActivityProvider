import {Injectable} from "@nestjs/common";
import {AnalyticsContract} from "./interfaces/analytics-contract.interface";
import {InjectModel} from "@nestjs/mongoose";
import {ActivityAnalytics, Analytics} from "./entities/analytics.entity";
import {Model} from "mongoose";

@Injectable()
export class AnalyticsService {

    constructor(@InjectModel(ActivityAnalytics.name)
                private analyticsDtoModel: Model<ActivityAnalytics>) {
    }

    async findAll(activityId: string): Promise<Analytics[]> {
        const pipeline = [
            { $unwind: '$analytics' },
            { $match: { 'analytics.activityId': activityId } },
            {
                $project: {
                    _id: 0,
                    inveniraStdID: 1,
                    qualAnalytics: '$analytics.qualAnalytics',
                    quantAnalytics: '$analytics.quantAnalytics',
                },
            },
        ];
        return await this.analyticsDtoModel.aggregate(pipeline).exec();
    }

    getContract(): AnalyticsContract {
        return {
            qualAnalytics: [
                {name: "elements_created_at", type: "application/json"},
                {name: "elements_content", type: "application/json"},
            ],
            quantAnalytics: [
                {name: "elements_count", type: "integer"},
            ],
        };
    }
}
