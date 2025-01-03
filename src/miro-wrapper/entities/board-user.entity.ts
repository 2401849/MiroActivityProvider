import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BoardUserSubscriptionDocument = HydratedDocument<BoardUserSubscription>;

@Schema({ collection: 'boardUsers' }) // Specify the collection name
export class BoardUserSubscription {
    @Prop({ required: true, unique: true })
    boardId: string;

    @Prop({ required: true, unique: true })
    miroUserMail: string;

    @Prop({ default: Date.now })
    subscribedAt: Date;
}

export const BoardUserSubscriptionSchema = SchemaFactory.createForClass(BoardUserSubscription);
