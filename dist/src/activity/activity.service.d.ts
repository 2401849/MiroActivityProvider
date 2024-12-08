import { ConsoleLogger } from "@nestjs/common";
import { Request } from "express";
import { Activity } from "./interfaces/activity.interface";
export declare class ActivityService {
    private readonly logger;
    private readonly activityList;
    constructor(logger: ConsoleLogger);
    deploy(id: string, request: Request): Promise<Record<string, string>>;
    provideActivity(id: string, request: Request, activity: Activity): Promise<Record<string, string>>;
    registerUserMiroId(request: Request): Promise<void>;
    decode(str: string): Record<string, string>;
}
