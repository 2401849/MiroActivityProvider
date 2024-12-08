import { ConfigParameters } from "src/configuration/interfaces/configuration.interface";
export interface Activity {
    activityID: string;
    "Inven!RAstdID": string;
    json_params: ConfigParameters;
}
