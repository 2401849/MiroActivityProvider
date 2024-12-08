"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiroWrapperService = void 0;
class MiroWrapperService {
    constructor() { }
    static getInstance() {
        if (!MiroWrapperService.instance) {
            MiroWrapperService.instance = new MiroWrapperService();
        }
        return MiroWrapperService.instance;
    }
    async registerUser(boardId, userId) {
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
        }
        catch (error) {
            throw new Error(`Error while registering user, ${error}`);
        }
    }
    async subscribeBoard(boardId) {
        const apiUrl = "https://api.miro.com/v2-experimental/webhooks/board_subscriptions";
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
        }
        catch (error) {
            throw new Error(`Error while subscribing board, ${error}`);
        }
    }
}
exports.MiroWrapperService = MiroWrapperService;
//# sourceMappingURL=miro-wrapper.service.js.map