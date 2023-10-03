import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from 'dotenv';
import { Strategy, VerifyCallBack } from 'passport-google-oauth20';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: String, refreshToken: string, profile: any, done: VerifyCallBack) : Promise<any>{
        const {id, name, emails, photos} = profile;
        const user = {
            id: id, 
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }

}