import { Module } from "@nestjs/common";
import { MiroObserverController } from "./miro-observer.controller";
import { MiroObserverService } from "./miro-observer.service";

@Module({
  controllers: [MiroObserverController],
  providers: [MiroObserverService],
})
export class MiroObserverModule {}
