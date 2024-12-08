import { ConfigurationService } from "./configuration.service";
export declare class ConfigurationController {
    private configService;
    constructor(configService: ConfigurationService);
    getParameters(): import("./interfaces/configuration.interface").ConfigParameters[];
    getInterface(): any;
}
