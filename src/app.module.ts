import { Module } from "@nestjs/common";
import { ActivityModule } from "./activity/activity.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { MiroObserverModule } from "./miro-observer/miro-observer.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { MiroWrapperOauthModule } from './miro-wrapper-oauth/miro-wrapper-oauth.module';
import {MongooseModule} from "@nestjs/mongoose";
import { ObserverModule } from './observer/observer.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigurationModule,
    ActivityModule,
    AnalyticsModule,
    MiroObserverModule,
    MiroWrapperOauthModule,
    ObserverModule,
  ],
})


export class AppModule {}
