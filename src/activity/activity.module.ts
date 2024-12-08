import { ConsoleLogger, Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, ConsoleLogger],
})
export class ActivityModule {}
