"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const miro_wrapper_service_1 = require("../miro-wrapper/miro-wrapper.service");
let ActivityService = class ActivityService {
    constructor(logger) {
        this.logger = logger;
        this.activityList = [];
    }
    async deploy(id, request) {
        const protocol = request.protocol;
        const host = request.hostname;
        const url = `${protocol}://${host}/activity/interface/${id}`;
        return { deployUrl: url };
    }
    async provideActivity(id, request, activity) {
        const protocol = request.protocol;
        const host = request.hostname;
        var obj = { activityID: id, IuserId: activity["Inven!RAstdID"] };
        var encoded = btoa(JSON.stringify(obj));
        const url = `${protocol}://${host}/activity/interface/${encoded}`;
        this.activityList.push(activity);
        const boardId = activity.json_params["boardid"];
        await miro_wrapper_service_1.MiroWrapperService.getInstance().subscribeBoard(boardId);
        return { deployUrl: url };
    }
    async registerUserMiroId(request) {
        const { activityID, IuserId, miroUserId } = request.body;
        const activityData = this.activityList.find((activity) => activity.activityID === activityID);
        if (!activityData)
            throw new common_1.NotFoundException();
        const boardId = activityData.json_params["boardid"];
        await miro_wrapper_service_1.MiroWrapperService.getInstance().registerUser(boardId, miroUserId);
    }
    decode(str) {
        return JSON.parse(atob(str));
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.ConsoleLogger])
], ActivityService);
//# sourceMappingURL=activity.service.js.map