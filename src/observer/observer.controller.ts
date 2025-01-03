import {Body, Controller, Post} from '@nestjs/common';
import {ObserverService} from './observer.service';
import {WebhookEventInterface} from "./interface/webhook-event.interface";
import {CreateEventInterface} from "./interface/create-event.interface";
import {DeleteEventInterface} from "./interface/delete-event.interface";
import {UpdateEventInterface} from "./interface/update-event.interface";

@Controller('miro-observer')
export class ObserverController {
    constructor(private readonly observerService: ObserverService) {
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
