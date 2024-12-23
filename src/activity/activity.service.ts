import { Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { MiroWrapperService } from "src/miro-wrapper/miro-wrapper.service";
import { Activity } from "./interfaces/activity.interface";
import { readFileSync } from "node:fs";
import { join } from "node:path";

@Injectable()
export class ActivityService {
  private readonly activityList: Activity[] = [];
  private readonly htmlContent: string;
  private readonly miroWrapperService = MiroWrapperService.getInstance();


  constructor() {
    const filePath = join(process.cwd(), "assets", "activity.html");
    this.htmlContent = readFileSync(filePath, "utf-8");
  }

  public async deploy(
    id: string,
    request: Request
  ): Promise<Record<string, string>> {
    const protocol = request.protocol;
    const host = request.hostname;
    const url = `${protocol}://${host}/activity/interface/${id}`;

    return { deployUrl: url };
  }

  public async provideActivity(
    id: string,
    request: Request,
    activity: Activity
  ): Promise<Record<string, string>> {
    const protocol = request.protocol;
    const host = request.hostname;
    var obj = { activityID: id, IuserId: activity["Inven!RAstdID"] };

    var encoded = btoa(JSON.stringify(obj));
    const url = `${protocol}://${host}/activity/interface/${encoded}`;

    this.activityList.push(activity);

    const teamId = activity.json_params["team_id"];
    const boardId = activity.json_params["boardid"];

    await this.miroWrapperService.subscribeBoard(teamId, boardId);

    return { deployUrl: url };
  }

  public async registerUserMiroId(request: Request): Promise<void> {
    const { activityID, IuserId, miroUserId } = request.body;

    const activityData = this.activityList.find(
      (activity) => activity.activityID === activityID
    );

    if (!activityData) throw new NotFoundException();
    const teamId = activityData.json_params["team_id"];
    const boardId = activityData.json_params["boardid"];

    await this.miroWrapperService.registerUser(teamId, boardId, miroUserId);
  }

  getInterface(): string {
    return this.htmlContent;
  }
}
