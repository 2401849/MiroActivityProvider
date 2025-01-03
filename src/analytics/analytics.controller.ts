import { Body, Controller, Get, Post } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import {Activity} from "../activity/entities/activity.entity";

@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post()
  async analytics(@Body() activity: Partial<Activity>) {
    return this.analyticsService.findAll(activity.activityID);
  }

  @Get("contract")
  getContract() {
    return this.analyticsService.getContract();
  }
}
