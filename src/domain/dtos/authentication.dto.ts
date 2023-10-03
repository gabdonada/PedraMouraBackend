import { IsNotEmpty } from 'class-validator'

export class AuthenticationUserBody {
    @IsNotEmpty()
    code: string;
}