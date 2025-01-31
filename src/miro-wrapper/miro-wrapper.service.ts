import axios from "axios";
import {TeamToken} from "./entities/team.entity";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ActivityAnalytics} from "../analytics/entities/analytics.entity";
import {Model} from "mongoose";

@Injectable()
export class MiroWrapperService {

    private readonly callbackUrl = process.env.CALLBACK_URL;
    private readonly clientId = process.env.MIRO_CLIENT_ID;
    private readonly clientSecret = process.env.MIRO_CLIENT_SECRET;
    private readonly redirectUri = process.env.REDIRECT_URI;

    constructor(@InjectModel(TeamToken.name) private tokenModel: Model<TeamToken>) {
    }
    async registerUser(boardId: string, userId: string, teamId: string): Promise<string> {

        const token = await this.getToken(teamId);

        const apiUrl = `https://api.miro.com/v2/boards/${boardId}/members`;
        const headers = {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const data = {
            emails: [userId],
            role: "editor",
        };
        try {
            const response = await axios.post(apiUrl, data, {headers});
            return response.data.successful[0];
        } catch (error) {
            throw new Error(`Error while registering user, ${error}`);
        }
    }

    async subscribeBoard(teamId: string, boardId: string): Promise<string> {
        const token = await this.getToken(teamId);
        const apiUrl =
            "https://api.miro.com/v2-experimental/webhooks/board_subscriptions";
        const headers = {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const data = {
            boardId: boardId,
            callbackUrl: `${this.callbackUrl}`,
            "status": "enabled"
        };
        try {
            const response = await axios.post(apiUrl, data, {headers});
            return response.data;
        } catch (error) {
            throw new Error(`Error while subscribing board, ${error}`);
        }
    }
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
    // addToken(teamId: string, token: string) {
    //   this.tokenMap.set(teamId, token);
    // }
    //
    // getToken(teamId: string): string | undefined {
    //   const token = this.tokenMap.get(teamId);
    //   if (!token) {
    //     throw new Error("No token found for team " + teamId);
    //   }
    //   return token
    // }
}
