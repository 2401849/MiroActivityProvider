export class MiroWrapperService {
  private static instance: MiroWrapperService;
  private constructor() {}

  static getInstance(): MiroWrapperService {
    if (!MiroWrapperService.instance) {
      MiroWrapperService.instance = new MiroWrapperService();
    }
    return MiroWrapperService.instance;
  }

  async registerUser(boardId: string, userId: string): Promise<string> {
    const apiUrl = `https://api.miro.com/v2/boards/${boardId}/members`;
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.MIRO_TOKEN}`,
    };
    const data = {
      emails: [userId],
      role: "editor",
    };
    try {
      return "user registered";
      // const response = await axios.post(apiUrl, data, { headers });
      // return response.data;
    } catch (error) {
      throw new Error(`Error while registering user, ${error}`);
    }
  }

  async subscribeBoard(boardId: string): Promise<string> {
    const apiUrl =
      "https://api.miro.com/v2-experimental/webhooks/board_subscriptions";
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
    };
    const data = {
      boardId: boardId,
      callbackUrl: "observer_endpoint",
    };
    try {
      return "subscribed";
      // const response = await axios.post(apiUrl, data, { headers });
      // return response.data;
    } catch (error) {
      throw new Error(`Error while subscribing board, ${error}`);
    }
  }
}
