import { ConfigParameters } from "./interfaces/configuration.interface";
export declare class ConfigurationService {
    private readonly htmlContent;
    constructor();
    private readonly parameters;
    getParameters(): ConfigParameters[];
    getInterface(): any;
}
