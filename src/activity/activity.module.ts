import {Module} from "@nestjs/common";
import {ActivityController} from "./activity.controller";
import {ActivityService} from "./activity.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Activity, ActivitySchema} from "./entities/activity.entity";
import {MiroWrapperModule} from "../miro-wrapper/miro-wrapper.module";
import {BoardEventSubscription, BoardEventSubscriptionSchema} from "../miro-wrapper/entities/board-event.entity";
import {BoardUserSubscription, BoardUserSubscriptionSchema} from "../miro-wrapper/entities/board-user.entity";

@Module({
    controllers: [ActivityController],
    providers: [ActivityService],
    exports: [ActivityService],
    imports: [MongooseModule.forFeature([{
        name: Activity.name, schema: ActivitySchema
    }, {name: BoardEventSubscription.name, schema: BoardEventSubscriptionSchema}, {
        name: BoardUserSubscription.name, schema: BoardUserSubscriptionSchema
    },]), MiroWrapperModule,],
})
export class ActivityModule {
}
