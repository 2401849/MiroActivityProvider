import { Module } from '@nestjs/common';
import { MiroObserverService } from './miro-observer.service';
import { MiroObserverController } from './miro-observer.controller';
import {ActivityAnalytics, ActivityAnalyticsSchema} from "../analytics/entities/analytics.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {Activity, ActivitySchema} from "../activity/entities/activity.entity";
import {Memento} from "./memento";

@Module({
  controllers: [MiroObserverController],
  providers: [MiroObserverService],
  imports: [
    MongooseModule.forFeature([
        { name: ActivityAnalytics.name, schema: ActivityAnalyticsSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
      Memento
  ],
})
export class MiroObserverModule {}
