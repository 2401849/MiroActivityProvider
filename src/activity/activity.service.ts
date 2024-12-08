import { ConsoleLogger, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { MiroWrapperService } from "src/miro-wrapper/miro-wrapper.service";
import { Activity } from "./interfaces/activity.interface";

@Injectable()
export class ActivityService {
  private readonly activityList: Activity[] = [];

  constructor(private readonly logger: ConsoleLogger) {}

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

    const boardId = activity.json_params["boardid"];

    await MiroWrapperService.getInstance().subscribeBoard(boardId);

    return { deployUrl: url };
  }

  public async registerUserMiroId(request: Request): Promise<void> {
    const { activityID, IuserId, miroUserId } = request.body;

    const activityData = this.activityList.find(
      (activity) => activity.activityID === activityID
    );

    if (!activityData) throw new NotFoundException();
    const boardId = activityData.json_params["boardid"];

    await MiroWrapperService.getInstance().registerUser(boardId, miroUserId);
  }

  decode(str: string): Record<string, string> {
    return JSON.parse(atob(str));
  }
}
