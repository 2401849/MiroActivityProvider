import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityAnalyticsDocument = HydratedDocument<ActivityAnalytics>;

export class Metric {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop()
    value?: any;
}

export class Analytics {
    @Prop({ required: true })
    activityId: string;

    @Prop({ type: [Metric], required: true })
    qualAnalytics: Metric[];

    @Prop({ type: [Metric], required: true })
    quantAnalytics: Metric[];
}

@Schema({ collection: 'userAnalytics' })
export class ActivityAnalytics {
    @Prop({ required: true, unique: true })
    inveniraStdID: string;

    @Prop({ type: [Analytics], required: true })
    analytics: Analytics[];
}

export const ActivityAnalyticsSchema = SchemaFactory.createForClass(ActivityAnalytics);
