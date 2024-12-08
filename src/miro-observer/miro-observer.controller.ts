import { Body, Controller, Post } from "@nestjs/common";

@Controller("miro-observer")
export class MiroObserverController {
  @Post()
  observer(@Body() body: any) {
    if (body.event) {
      //create service to save it on db
      console.log("Data about the webhook event:");
      console.log(body.event);
      console.log("Content from the webhook:");
      console.log(body.event.item.data.content);
    }

    if (body.challenge) {
      console.log("here is the challenge:", body.challenge);
      return body;
    }
    return;
  }
}
