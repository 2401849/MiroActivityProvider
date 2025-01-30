import {Controller, Get, Query, Redirect} from '@nestjs/common';
import {MiroWrapperService} from "./miro-wrapper.service";

@Controller('/')
export class MiroWrapperController {

    constructor(private readonly miroWrapperService: MiroWrapperService  ){
    }
    @Get()
    @Redirect()
    getInstallation() {
        const url = this.miroWrapperService.getInstallationUrl()
        return {url}
    }
    @Get('oauth/callback')
    async handleOauthCallback(@Query('code') code: string) {
        return this.miroWrapperService.exchangeCodeForToken(code);
    }
}
