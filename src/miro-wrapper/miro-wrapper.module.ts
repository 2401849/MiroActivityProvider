import { Module } from '@nestjs/common';
import {MiroWrapperController} from "./miro-wrapper.controller";
import {MiroWrapperService} from "./miro-wrapper.service";
import {MongooseModule} from "@nestjs/mongoose";
import {BoardEventSubscription, BoardEventSubscriptionSchema} from "./entities/board-event.entity";
import {BoardUserSubscription, BoardUserSubscriptionSchema} from "./entities/board-user.entity";
import {TeamToken, TeamTokenSchema} from "./entities/team.entity";
import {Activity, ActivitySchema} from "../activity/entities/activity.entity";


@Module({
    imports: [
        // Register schemas for Mongoose
        MongooseModule.forFeature([
            { name: BoardEventSubscription.name, schema: BoardEventSubscriptionSchema },
            { name: BoardUserSubscription.name, schema: BoardUserSubscriptionSchema },
            { name: TeamToken.name, schema: TeamTokenSchema },
            { name: Activity.name, schema: ActivitySchema },
        ]),
    ],
    controllers: [ MiroWrapperController],
    providers: [ MiroWrapperService ],
    exports: [ MiroWrapperService ]
})
export class MiroWrapperModule {}
