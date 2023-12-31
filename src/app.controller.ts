import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/uses-cases/auth/auth.guard';

@Controller()
export class AppController {

  @UseGuards(AuthGuard)
  @Get()
  async get(){
    return "Bem vindo a API da Pedra Moura !";
  }

}
