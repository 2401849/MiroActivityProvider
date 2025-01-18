import {Model} from "mongoose";
import {UserMap} from "./entities/user-map";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class Memento {
    private readonly mapUsers = new Map<string, string>;

    constructor(@InjectModel(UserMap.name) private readonly userModel: Model<UserMap>) {
        userModel
            .find()
            .exec()
            .then(users => users
                .forEach(user => this.mapUsers.set(user.miroUserId, user.iUserId)));
    }

    getState() {
        return this.mapUsers
    }

    async setState(state: Map<string,string>) {
        const bulkOperations = Array.from(state.entries())
            .map(e => {
                this.mapUsers.set(e[0],e[1])
                return {
                    miroUserId: e[0],
                    iUserId: [1]
                }
            })
            .map(doc => ({
            updateOne: {
                filter: { uniqueField: doc.miroUserId },
                update: { $set: doc },
                upsert: true,
            },
        }));

        if (bulkOperations.length > 0) {
            await this.userModel.bulkWrite(bulkOperations);
        }
    }
}