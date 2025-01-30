import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Request} from "express";
import {Model} from 'mongoose';
import {Activity, ActivityDocument} from './entities/activity.entity';
import {join} from "node:path";
import {readFileSync} from "node:fs";
import {MiroWrapperService} from "../miro-wrapper/miro-wrapper.service";
import {ActivityReqInterface} from "./interfaces/activity-request.interface";
import {BoardEventSubscription, BoardEventSubscriptionDocument} from "../miro-wrapper/entities/board-event.entity";
import {BoardUserSubscription, BoardUserSubscriptionDocument} from "../miro-wrapper/entities/board-user.entity";

@Injectable()
export class ActivityService {
    private readonly htmlContent: string;


    constructor(
        @InjectModel(Activity.name)
        private readonly activityModel: Model<ActivityDocument>,
        @InjectModel(BoardUserSubscription.name)
        private readonly boardSubscriptionModel: Model<BoardUserSubscriptionDocument>,
        @InjectModel(BoardEventSubscription.name)
        private readonly boardEventSubscriptionModel: Model<BoardEventSubscriptionDocument>,
        private readonly miroWrapperService: MiroWrapperService
    ) {
        const filePath = join(process.cwd(), "assets", "activity.html");
        this.htmlContent = readFileSync(filePath, "utf-8");
    }

    async createActivity(id: string, request: Request, activityReqInterface: ActivityReqInterface): Promise<Record<string, string>> {

        const protocol = request.protocol;
        const host = request.hostname;
        var obj = {activityID: id, iUserId: activityReqInterface["Inven!RAstdID"]};

        var encoded = btoa(JSON.stringify(obj));
        const url = `${protocol}://${host}/activity/interface/${encoded}`;

        const boardId = activityReqInterface.json_params["board_id"];
        const teamId = activityReqInterface.json_params["team_id"];

        const newActivity = new this.activityModel({
            activityID: activityReqInterface.activityID,
            boardId: activityReqInterface.json_params["board_id"],
            teamId: activityReqInterface.json_params["team_id"],
            activityInstructions: activityReqInterface.json_params["instructions"],
            activityName: activityReqInterface.json_params["name"],
            iUserId: activityReqInterface.json_params["Inven!RAstdID"]
        });

        const subscribed = await this.boardEventSubscriptionModel.findOne({ boardId})
        if (!subscribed) {
            await this.miroWrapperService.subscribeBoard(teamId, boardId);
            await new this.boardEventSubscriptionModel({boardId}).save();
        }
        try {
            await newActivity.save();
        } catch (e) {
            throw new Error(e);
        }
        return {deployUrl: url};
    }

    async findActivityById(activityID: string, request: Request): Promise<Record<string, string>> {
        const protocol = request.protocol;
        const host = request.hostname;
        const url = `${protocol}://${host}/activity/interface/${activityID}`;

        return {deployUrl: url};
    }

    getInterface(): string {
        return this.htmlContent;
    }

    async updateUserInfo(updateData: Partial<Activity>): Promise<Activity | null> {

        const miroUserMail = updateData.miroUserMail;
        const iUserId = updateData.iUserId;
        const activityID = updateData.activityID;

        const additionalDetails = await this.activityModel.findOne({ activityID}).exec()

        if (!additionalDetails) { throw new Error('No activity details found for activity ID: ' + activityID); }

        const { teamId, boardId } = additionalDetails;

        const registered = await this.boardSubscriptionModel.findOne({ boardId, miroUserMail})

        if (!registered) {
            const miroUserId = await this.miroWrapperService.registerUser(teamId, boardId, miroUserMail);
            if (miroUserId) {
                updateData["miroUserId"] = miroUserId
            }
            await new this.boardSubscriptionModel({boardId, miroUserMail}).save();
        }

        return this.activityModel.findOneAndUpdate({iUserId}, updateData, {
            new: true,
        }).exec();
    }
}
