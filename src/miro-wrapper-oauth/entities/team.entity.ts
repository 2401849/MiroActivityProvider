import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamTokenDocument = HydratedDocument<TeamToken>;

@Schema({ collection: 'teamTokens' }) // Specify the collection name
export class TeamToken {
    @Prop({ required: true, unique: true })
    teamId: string;

    @Prop({ required: true })
    token: string;
}

export const TeamTokenSchema = SchemaFactory.createForClass(TeamToken);
