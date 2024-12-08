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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const activity_service_1 = require("./activity.service");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    registerUserMiroId(request) {
        return this.activityService.registerUserMiroId(request);
    }
    async provideActivity(id, activity, request) {
        return this.activityService.provideActivity(id, request, activity);
    }
    deploy(id, request) {
        return this.activityService.deploy(id, request);
    }
    provideInterface(activityRef) {
        const { activityID, IuserId } = this.activityService.decode(activityRef);
        return { activityID: activityID, IuserId: IuserId };
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)("/interface"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "registerUserMiroId", null);
__decorate([
    (0, common_1.Post)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Request]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "provideActivity", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "deploy", null);
__decorate([
    (0, common_1.Get)("/interface/:activity"),
    (0, common_1.Render)("activity"),
    __param(0, (0, common_1.Param)("activity")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "provideInterface", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.Controller)("/activity"),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map