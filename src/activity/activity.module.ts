import { ConsoleLogger, Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { Activity_1Service } from "./activity_1.service";

@Module({
  controllers: [ActivityController],
  providers: [Activity_1Service],
})
export class ActivityModule {}
