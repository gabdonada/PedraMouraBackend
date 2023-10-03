import { Injectable } from "@nestjs/common";
import { AuthenticationUserBody } from "src/domain/dtos/authentication.dto";
import { UserUseCases } from "../user/user.use-case";

@Injectable()
export class AuthUseCases {

  constructor(
    private userUseCases: UserUseCases
  ) {}

  async authenticateGithub(dto: AuthenticationUserBody): Promise<String> {
    return await this.userUseCases.authenticateGithub(dto);
  }

  async authenticateGoogle(req: any): Promise<Object> {
    let user;
    if (!req.user) {
      return 'No user from google'
    }
    user = await this.userUseCases.findByUnique('GOOGLE', req.user);
    if (!user) {
      user = await this.userUseCases.create('GOOGLE', req.user);
    }
    return {
      message: 'User Info from Google',
      user: user
    }
  }

}