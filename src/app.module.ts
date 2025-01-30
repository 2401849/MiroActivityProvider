import {Module} from "@nestjs/common";
import {ActivityModule} from "./activity/activity.module";
import {AnalyticsModule} from "./analytics/analytics.module";
import {ConfigurationModule} from "./configuration/configuration.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MiroWrapperModule} from './miro-wrapper/miro-wrapper.module';
import {MongooseModule} from "@nestjs/mongoose";
import {MiroObserverModule} from "./miro-observer/miro-observer.module";
import {Memento} from "./miro-observer/memento";


@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRootAsync({
        imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
        }), inject: [ConfigService],
    }), ConfigurationModule, ActivityModule, AnalyticsModule, MiroWrapperModule, MiroObserverModule],
})


export class AppModule {
}
