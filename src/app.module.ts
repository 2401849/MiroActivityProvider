import { Module } from "@nestjs/common";
import { ActivityModule } from "./activity/activity.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { MiroObserverModule } from "./miro-observer/miro-observer.module";
import {ConfigModule} from "@nestjs/config";
import { MiroWrapperOauthModule } from './miro-wrapper-oauth/miro-wrapper-oauth.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ConfigurationModule,
    ActivityModule,
    AnalyticsModule,
    MiroObserverModule,
    MiroWrapperOauthModule,
  ],
})


export class AppModule {}
