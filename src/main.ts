import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "node:path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(process.cwd(), "views"));
  app.setViewEngine("hbs");
  await app.listen(process.env.PORT || 3000);
}
bootstrap();