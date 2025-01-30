import { Module } from "@nestjs/common";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import {MongooseModule} from "@nestjs/mongoose";
import {ActivityAnalytics, ActivityAnalyticsSchema} from "./entities/analytics.entity";

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [
    MongooseModule.forFeature([{ name: ActivityAnalytics.name, schema: ActivityAnalyticsSchema }]),
  ],
})
export class AnalyticsModule {}
