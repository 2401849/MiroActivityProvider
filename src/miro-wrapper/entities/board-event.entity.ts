import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BoardEventSubscriptionDocument = HydratedDocument<BoardEventSubscription>;

@Schema({ collection: 'boardEvents' }) // Specify the collection name
export class BoardEventSubscription {
    @Prop({ required: true, unique: true })
    boardId: string;

    @Prop({ default: Date.now })
    subscribedAt: Date;
}

export const BoardEventSubscriptionSchema = SchemaFactory.createForClass(BoardEventSubscription);
