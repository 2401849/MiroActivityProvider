import axios from "axios";
import {MiroWrapperOauthService} from "../miro-wrapper-oauth/miro-wrapper-oauth.service";

export class MiroWrapperService {

    private static instance: MiroWrapperService;
    private readonly callbackUrl = process.env.CALLBACK_URL;
    private readonly oauth: MiroWrapperOauthService;

    private constructor() {
    }

    static getInstance(): MiroWrapperService {
        if (!MiroWrapperService.instance) {
            MiroWrapperService.instance = new MiroWrapperService();
        }
        return MiroWrapperService.instance;
    }

    async registerUser(boardId: string, userId: string, teamId: string): Promise<string> {

        const token = await this.oauth.getToken(teamId);

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
            return response.data;
        } catch (error) {
            throw new Error(`Error while registering user, ${error}`);
        }
    }

    async subscribeBoard(teamId: string, boardId: string): Promise<string> {
        const token = await this.oauth.getToken(teamId);
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
