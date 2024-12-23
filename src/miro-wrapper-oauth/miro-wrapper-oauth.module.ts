import { Module } from '@nestjs/common';
import {MiroWrapperOauthController} from "./miro-wrapper-oauth.controller";
import {MiroWrapperOauthService} from "./miro-wrapper-oauth.service";

@Module({
    controllers: [ MiroWrapperOauthController],
    providers: [MiroWrapperOauthService],
    exports: [MiroWrapperOauthService],
})
export class MiroWrapperOauthModule {}
