import { Injectable } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ConfigParameters } from "./interfaces/configuration.interface";

@Injectable()
export class ConfigurationService {
  private readonly htmlContent;

  constructor() {
    const filePath = join(process.cwd(), "assets", "configuration.html");
    this.htmlContent = readFileSync(filePath, "utf-8");
  }
  private readonly parameters: ConfigParameters[] = [
    { name: "name", type: "text/plain" },
    { name: "instructions", type: "text/plain" },
    { name: "boardid", type: "text/plain" },
  ];

  getParameters(): ConfigParameters[] {
    return this.parameters;
  }

  getInterface() {
    return this.htmlContent;
  }
}