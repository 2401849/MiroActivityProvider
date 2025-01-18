import {Injectable} from '@nestjs/common';
import {CreateEventInterface} from './interface/create-event.interface';
import {UpdateEventInterface} from './interface/update-event.interface';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DeleteEventInterface} from "./interface/delete-event.interface";
import {ActivityAnalytics} from "../analytics/entities/analytics.entity";
import {Activity, ActivityDocument} from "../activity/entities/activity.entity";
import {Memento} from "./memento";

@Injectable()
export class MiroObserverService {

    constructor(@InjectModel(ActivityAnalytics.name) private analyticsDtoModel: Model<ActivityAnalytics>, @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>, private readonly memento: Memento) {
    }

    async create(event: CreateEventInterface) {
        const {boardId, item} = event;
        const userId = this.fetchUser(item.createdBy.id);
        const qualAnalytics = [{
            name: 'elements_created_at',
            type: 'application/json',
            value: item.createdAt
        }, {name: 'elements_content', type: 'application/json', value: item.data.content},];

        const quantAnalytics = [{name: 'elements_count', type: 'integer', value: 1},];

        await this.analyticsDtoModel.updateOne({inveniraStdID: userId}, {
            $push: {
                analytics: {
                    activityId: boardId, qualAnalytics, quantAnalytics,
                },
            },
        }, {upsert: true},);
    }

    update(event: UpdateEventInterface) {
        return `This action updates a observer`;
    }

    delete(event: DeleteEventInterface) {
        return undefined;
    }

    async fetchUser(userId: string): Promise<string> {
        const mapUsers = this.memento.getState()
        let user = mapUsers.get(userId);
        if (!user) {
            const userInDb = await this.activityModel.findOne({miroUserId: userId}, {iUserId: 1, _id: 0}).exec()
            if (userInDb) {
                user = userInDb.iUserId
                mapUsers.set(userId, user)
                await this.memento.setState(mapUsers)
            } else {
                user = "";
            }
        }
        return user
    }
}
