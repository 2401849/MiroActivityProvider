import {CreateEventInterface} from "./create-event.interface";
import {UpdateEventInterface} from "./update-event.interface";
import {DeleteEventInterface} from "./delete-event.interface";

export interface WebhookEventInterface {
    event: CreateEventInterface | UpdateEventInterface | DeleteEventInterface;
    challenge: any
}