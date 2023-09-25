import { Body, Controller, Get, Post } from '@nestjs/common';
import { AbstractUserRepository } from './repositories/interfaces/abstract-user-repository';
import { AuthenticationUserBody } from './dtos/authentication-body';

@Controller('api')
export class AppController {
  constructor(
    private createNewUserRepository: AbstractUserRepository
  ) {}

  @Post('userauthentication')
  async postUserAuthentication(@Body() body: AuthenticationUserBody){
    const { code } = body;

    await this.createNewUserRepository.authenticate(code);
  }

}
