import axios from "axios";
import {MiroWrapperOauthService} from "../miro-wrapper-oauth/miro-wrapper-oauth.service";

export class MiroWrapperService {

  private readonly callbackUrl = process.env.CALLBACK_URL;

  private static instance: MiroWrapperService;
  private tokenMap: Map<string, string> = new Map()//Save in db later stage

  private constructor() {}

  static getInstance(): MiroWrapperService {
    if (!MiroWrapperService.instance) {
      MiroWrapperService.instance = new MiroWrapperService();
    }
    return MiroWrapperService.instance;
  }

  async registerUser(teamId: string, boardId: string, userId: string): Promise<string> {
    const token = this.getToken(teamId)

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
      //return "user registered";
      const response = await axios.post(apiUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error while registering user, ${error}`);
    }
  }

  async subscribeBoard(teamId: string, boardId: string): Promise<string> {
    const token = this.getToken(teamId)
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
      "status":"enabled"
    };
    try {
      //return "subscribed";
      const response = await axios.post(apiUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error while subscribing board, ${error}`);
    }
  }

  addToken(teamId: string, token: string) {
    this.tokenMap.set(teamId, token);
  }

  getToken(teamId: string): string | undefined {
    const token = this.tokenMap.get(teamId);
    if (!token) {
      throw new Error("No token found for team " + teamId);
    }
    return token
  }
}
