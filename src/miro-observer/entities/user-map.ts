import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type UserMapDocument = HydratedDocument<UserMap>;

@Schema({collection: 'user-map'})
export class UserMap {
    @Prop({required: true, unique: true}) iUserId: string;

    @Prop({required: true, unique: true}) miroUserId: string;
}

export const UserMapSchema = SchemaFactory.createForClass(UserMap);
