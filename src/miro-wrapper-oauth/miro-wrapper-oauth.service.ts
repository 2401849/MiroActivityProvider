import {Injectable} from '@nestjs/common';
import axios from "axios";
import {MiroWrapperService} from "../miro-wrapper/miro-wrapper.service";

@Injectable()
export class MiroWrapperOauthService {

    private readonly clientId = process.env.MIRO_CLIENT_ID;
    private readonly clientSecret = process.env.MIRO_CLIENT_SECRET;
    private readonly redirectUri = process.env.REDIRECT_URI;

    private readonly miroWrapperService = MiroWrapperService.getInstance();

    async exchangeCodeForToken(code: string) {
        const apiUrl = "https://api.miro.com/v1/oauth/token";
        const params = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: this.redirectUri,
        };
        try {
            const response = await axios.post(apiUrl, null, {
                params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const { access_token, team_id} = response.data

            if (!team_id || !access_token) {
                throw new Error("Invalid response from Miro API");
            }
            this.miroWrapperService.addToken(team_id, access_token);
            return (
                "Application authorized successfully. You can close this window now."
            )
        } catch (e) {
            throw new Error(`Error while exchanging code for token, ${e}`);
        }
    }
    getInstallationUrl(): string {
        return `https://miro.com/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`
    }

}
