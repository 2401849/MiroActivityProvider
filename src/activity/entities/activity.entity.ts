import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema({ collection: 'activities' })
export class Activity {
    @Prop({ required: true })
    activityID: string;

    @Prop({ required: true })
    activityName: string;

    @Prop()
    activityInstructions?: string;

    @Prop({ required: true })
    iUserId: string;

    @Prop({ required: true })
    miroUserId: string;

    @Prop({ required: true })
    miroUserMail: string;

    @Prop({ required: true })
    teamId: string;

    @Prop({ required: true })
    boardId: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);

ActivitySchema.index({ activityID: 1, boardId: 1 }, { unique: true });
