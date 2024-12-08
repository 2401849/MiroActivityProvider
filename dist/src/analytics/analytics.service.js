"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const analytics_models_1 = require("./models/analytics.models");
let AnalyticsService = class AnalyticsService {
    constructor() {
        this.analyticsContract = analytics_models_1.AnaltyticsContract;
        this.activities = [
            {
                inveniraStdID: "1001",
                quantAnalytics: [{ name: "elements_count", type: "integer", value: 3 }],
                qualAnalytics: [
                    {
                        name: "elements_created_at",
                        type: "application/json",
                        value: [
                            { object_name: "obj_1", date: "2024" },
                            { object_name: "obj_2", date: "2022" },
                            { object_name: "obj_3", date: "2021" },
                        ],
                    },
                    {
                        name: "elements_content",
                        type: "application/json",
                        value: [
                            { object_name: "obj_1", date: "this is the content of the object" },
                            { object_name: "obj_2", date: "this is the content of the object" },
                            { object_name: "obj_3", date: "this is the content of the object" },
                        ],
                    },
                ],
            },
        ];
    }
    findOne(id) {
        return this.activities.find((activity) => activity.inveniraStdID === id);
    }
    getContract() {
        return this.analyticsContract;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)()
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map