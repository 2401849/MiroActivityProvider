import { Body, Controller, Get, Post } from "@nestjs/common";
import { Activity } from "src/activity/interfaces/activity.interface";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post()
  analytics(@Body() activity: Activity) {
    return this.analyticsService.findOne(activity.activityID);
  }

  @Get("contract")
  getContract() {
    return this.analyticsService.getContract();
  }
}
