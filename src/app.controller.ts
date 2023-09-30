import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get()
  async getVehicles(){
    return "Bem vindo a API da Pedra Moura !";
  }

}
