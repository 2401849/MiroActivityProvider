import { Module } from '@nestjs/common';
import { MiroObserverService } from './miro-observer.service';
import { MiroObserverController } from './miro-observer.controller';

@Module({
  controllers: [MiroObserverController],
  providers: [MiroObserverService],
})
export class MiroObserverModule {}
