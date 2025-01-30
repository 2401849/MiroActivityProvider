import {Injectable} from "@nestjs/common";
import {AnalyticsContract} from "./interfaces/analytics-contract.interface";
import {InjectModel} from "@nestjs/mongoose";
import {ActivityAnalytics} from "./entities/analytics.entity";
import {Model} from "mongoose";

@Injectable()
export class AnalyticsService {

    constructor(@InjectModel(ActivityAnalytics.name) private analyticsModel: Model<ActivityAnalytics>) {
    }

    async findAll(activityId: string): Promise<ActivityAnalytics[]> {
        return await this.analyticsModel
            .find({activityId})
            .select('-_id inveniraStdID boardId qualAnalytics quantAnalytics')
            .exec();
    }

    getContract(): AnalyticsContract {
        return {
            qualAnalytics: [{name: "elements_created_at", type: "application/json"}, {
                name: "elements_content",
                type: "application/json"
            },], quantAnalytics: [{name: "elements_count", type: "integer"},],
        };
    }
}
