import {Injectable} from '@nestjs/common';
import axios from "axios";
import {MiroWrapperService} from "../miro-wrapper/miro-wrapper.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TeamToken, TeamTokenDocument} from "./entities/team.entity";

@Injectable()
export class MiroWrapperOauthService {

    private readonly clientId = process.env.MIRO_CLIENT_ID;
    private readonly clientSecret = process.env.MIRO_CLIENT_SECRET;
    private readonly redirectUri = process.env.REDIRECT_URI;

    constructor(
        @InjectModel(TeamToken.name) private readonly tokenModel: Model<TeamTokenDocument>,
    ) {}

    async exchangeCodeForToken(code: string) {
        const apiUrl = "https://api.miro.com/v1/oauth/token";
        const params = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: this.redirectUri,
        };
        try {
            const response = await axios.post(apiUrl, null, {
                params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const { access_token, team_id} = response.data

            if (!team_id || !access_token) {
                throw new Error("Invalid response from Miro API");
            }
            await this.addToken(team_id, access_token);
            return (
                "Application authorized successfully. You can close this window now."
            )
        } catch (e) {
            throw new Error(`Error while exchanging code for token, ${e}`);
        }
    }
    getInstallationUrl(): string {
        return `https://miro.com/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`
    }

    async addToken(teamId: string, token: string): Promise<TeamToken> {
        const existingToken = await this.tokenModel.findOne({ teamId }).exec();
        if (existingToken) {
            existingToken.token = token; // Update the token if the teamId already exists
            return existingToken.save();
        }

        const newToken = new this.tokenModel({ teamId, token });
        return newToken.save();
    }

    // Get a token from the database
    async getToken(teamId: string): Promise<string> {
        const tokenDoc = await this.tokenModel.findOne({ teamId }).exec();
        if (!tokenDoc) {
            throw new Error("No token found for team " + teamId);
        }
        return tokenDoc.token;
    }
}
