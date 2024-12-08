import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
} from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Activity } from "./interfaces/activity.interface";

@Controller("/activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post("/interface")
  registerUserMiroId(@Req() request: Request): Promise<void> {
    return this.activityService.registerUserMiroId(request);
  }

  @Post(":id")
  async provideActivity(
    @Param("id") id: string,
    @Body() activity: Activity,
    @Req() request: Request
  ): Promise<Record<string, string>> {
    return this.activityService.provideActivity(id, request, activity);
  }

  @Get(":id")
  deploy(
    @Param("id") id: string,
    @Req() request: Request
  ): Promise<Record<string, string>> {
    return this.activityService.deploy(id, request);
  }

  @Get("/interface/:activity")
  @Render("activity")
  provideInterface(@Param("activity") activityRef: string) {
    const { activityID, IuserId } = this.activityService.decode(activityRef);
    return { activityID: activityID, IuserId: IuserId };
  }
}
