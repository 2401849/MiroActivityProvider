import { Controller, Get } from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";

@Controller("configuration")
export class ConfigurationController {
  constructor(private configService: ConfigurationService) {}

  @Get("parameters")
  getParameters() {
    return this.configService.getParameters();
  }

  @Get("interface")
  getInterface() {
    return this.configService.getInterface();
  }
}
