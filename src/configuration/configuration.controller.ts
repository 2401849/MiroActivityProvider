import {Controller, Get} from "@nestjs/common";
import {join} from "node:path";
import {readFileSync} from "node:fs";
import {ConfigParameters} from "./interfaces/configuration.interface";

@Controller("configuration")
export class ConfigurationController {

    private readonly htmlContent: string;
    private readonly parameters: ConfigParameters[] = [
        {name: "name", type: "text/plain"},
        {name: "instructions", type: "text/plain"},
        {name: "board_id", type: "text/plain"},
        {name: "team_id", type: "text/plain"}
    ];

    constructor() {
        const filePath = join(process.cwd(), "assets", "configuration.html");
        this.htmlContent = readFileSync(filePath, "utf-8");
    }

    @Get("parameters") getParameters() {
        return this.parameters;
    }

    @Get("interface") getInterface() {
        return this.htmlContent;
    }
}
