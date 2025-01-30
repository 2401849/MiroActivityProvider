import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityAnalyticsDocument = HydratedDocument<ActivityAnalytics>;

export class Metric {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ type: Object })
    value?: any;
}

@Schema({ collection: 'userAnalytics' })
export class ActivityAnalytics {
    @Prop({ required: true, unique: false })
    inveniraStdID: string;

    @Prop({ required: true })
    activityId: string;

    @Prop({ required: true })
    boardId: string;

    @Prop({ type: [Metric], required: true })
    qualAnalytics: Metric[];

    @Prop({ type: [Metric], required: true })
    quantAnalytics: Metric[];
}

export const ActivityAnalyticsSchema = SchemaFactory.createForClass(ActivityAnalytics);

ActivityAnalyticsSchema.index({ inveniraStdID: 1, activityId: 1, boardId: 1 }, { unique: true });
