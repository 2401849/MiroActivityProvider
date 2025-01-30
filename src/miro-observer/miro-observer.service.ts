import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateEventInterface} from './interface/create-event.interface';
import {UpdateEventInterface} from './interface/update-event.interface';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DeleteEventInterface} from "./interface/delete-event.interface";
import {ActivityAnalytics} from "../analytics/entities/analytics.entity";
import {Activity, ActivityDocument} from "../activity/entities/activity.entity";
import {Memento} from "./memento";
import {AnalyticsContract} from "../analytics/interfaces/analytics-contract.interface";

@Injectable()
export class MiroObserverService {

    constructor(
        @InjectModel(ActivityAnalytics.name) private analyticsDtoModel: Model<ActivityAnalytics>,
        @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>,
        private readonly memento: Memento) {
    }

    async create(event: CreateEventInterface) {
        const {boardId, item} = event;
        const userId = await this.fetchUser(item.createdBy.id);
        const activityId = await this.fetchActivityId(boardId, userId);

        // Directly perform an upsert to add data
        await this.analyticsDtoModel.updateOne(
            { activityId, boardId, inveniraStdID: userId }, // Query filter
            {
                $addToSet: {
                    'qualAnalytics.$[elementsCreatedAt].value': { id: item.id, createdAt: item.createdAt },
                    'qualAnalytics.$[elementsContent].value': { id: item.id, content: item.data.content },
                },
                $inc: { 'quantAnalytics.$[elementsCount].value': 1 }, // Increment the elements_count metric
            },
            {
                upsert: true, // Create document if it doesn't exist
                arrayFilters: [
                    { 'elementsCreatedAt.name': 'elements_created_at' },
                    { 'elementsContent.name': 'elements_content' },
                    { 'elementsCount.name': 'elements_count' },
                ],
            },
        );
    }

    async update(event: UpdateEventInterface) {
        const {boardId, item} = event;
        const userId = await this.fetchUser(item.createdBy.id);
        const activityId = await this.fetchActivityId(boardId, userId);

        await this.analyticsDtoModel.updateOne(
            { activityId, boardId, inveniraStdID: userId },
            {
                $set: {
                    'qualAnalytics.$[elementsContent].value.$[contentItem].content': item.data.content,
                },
            },
            {
                arrayFilters: [
                    { 'elementsContent.name': 'elements_content' },
                    { 'contentItem.id': item.id },
                ],
            },
        );
    }

    async delete(event: DeleteEventInterface) {
        // This feature for now has no utility
        return undefined;
    }

    private async fetchUser(userId: string): Promise<string> {
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
    private async fetchActivityId(boardId: string, userID: string): Promise<string> {
        const activity = await this.activityModel.findOne({ boardId, userID }).exec();
        if (!activity) {
            throw new NotFoundException(`No activity found for boardId: ${boardId} and userID: ${userID}`);
        }
        return activity.activityID;
    }
}
