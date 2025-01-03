import {Body, Controller, Get, Param, Post, Req,} from "@nestjs/common";
import {ActivityReqInterface} from "./interfaces/activity-request.interface";
import {ActivityService} from "./activity.service";
import {Activity} from "./entities/activity.entity";

@Controller("activity")
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {
    }

    @Post("interface") updateUserInfo(@Body() updateData: Partial<Activity>): Promise<Activity | null> {
        return this.activityService.updateUserInfo(updateData);
    }

    @Post(":id") async provideActivity(@Param("id") id: string, @Body() activity: ActivityReqInterface, @Req() request: Request): Promise<Record<string, string>> {
        return this.activityService.createActivity(id, request, activity);
    }

    @Get(":id") deploy(@Param("id") id: string, @Req() request: Request): Promise<Record<string, string>> {
        return this.activityService.findActivityById(id, request);
    }

    @Get("/interface/:activity") provideInterface() {
        return this.activityService.getInterface();
    }
}
