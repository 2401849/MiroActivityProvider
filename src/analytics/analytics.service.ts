import { Injectable } from "@nestjs/common";
import { AnalyticsActivity } from "./interfaces/analytics.interface";
import { AnaltyticsContract } from "./models/analytics.models";

@Injectable()
export class AnalyticsService {
  private readonly analyticsContract = AnaltyticsContract;
  private activities: AnalyticsActivity[] = [
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

  findOne(id: string): AnalyticsActivity | undefined {
    return this.activities.find((activity) => activity.inveniraStdID === id);
  }

  getContract() {
    return this.analyticsContract;
  }
}
