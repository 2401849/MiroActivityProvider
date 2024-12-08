import { ActivityService } from "./activity.service";
import { Activity } from "./interfaces/activity.interface";
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    registerUserMiroId(request: Request): Promise<void>;
    provideActivity(id: string, activity: Activity, request: Request): Promise<Record<string, string>>;
    deploy(id: string, request: Request): Promise<Record<string, string>>;
    provideInterface(activityRef: string): {
        activityID: string;
        IuserId: string;
    };
}
