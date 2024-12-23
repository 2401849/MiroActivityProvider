import {Controller, Get, Query, Redirect} from '@nestjs/common';
import {MiroWrapperOauthService} from "./miro-wrapper-oauth.service";

@Controller('/')
export class MiroWrapperOauthController {

    constructor(private readonly oauthService: MiroWrapperOauthService ){
    }
    @Get()
    @Redirect()
    getInstallation() {
        const url = this.oauthService.getInstallationUrl()
        return {url}
    }
    @Get('oauth/callback')
    async handleOauthCallback(@Query('code') code: string) {
        return this.oauthService.exchangeCodeForToken(code);
    }
}
