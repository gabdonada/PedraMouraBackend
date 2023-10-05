import { Injectable } from "@nestjs/common";
import { AuthenticationUserBody } from "src/domain/dtos/authentication.dto";
import { UserUseCases } from "../user/user.use-case";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthUseCases {

  constructor(
    private userUseCases: UserUseCases,
    private jwtService: JwtService
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
    const payload = {
      sub: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl
    };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

}