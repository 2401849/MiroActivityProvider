import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema({ collection: 'activities' })
export class Activity {
    @Prop()
    activityID: string;

    @Prop()
    activityName: string;

    @Prop()
    activityInstructions?: string;

    @Prop()
    iUserId: string;

    @Prop()
    miroUserId: string;

    @Prop()
    miroUserMail: string;

    @Prop()
    teamId: string;

    @Prop()
    boardId: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);

ActivitySchema.index({ activityID: 1, boardId: 1 }, { unique: true });
