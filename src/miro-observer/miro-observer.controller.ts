import {Body, Controller, Post} from '@nestjs/common';
import {MiroObserverService} from './miro-observer.service';
import {WebhookEventInterface} from "./interface/webhook-event.interface";
import {CreateEventInterface} from "./interface/create-event.interface";
import {DeleteEventInterface} from "./interface/delete-event.interface";
import {UpdateEventInterface} from "./interface/update-event.interface";

@Controller('miro-miro-observer')
export class MiroObserverController {
    constructor(private readonly observerService: MiroObserverService) {
    }

    @Post() create(@Body() body: WebhookEventInterface) {

        if (body.challenge) {
            return body;
        }

        switch (body.event.type) {
            case "create":
                return this.observerService.create(body.event as CreateEventInterface)
            case "delete":
                return this.observerService.delete(body.event as DeleteEventInterface)
            case "update":
                return this.observerService.update(body.event as UpdateEventInterface)
        }
    }
}
