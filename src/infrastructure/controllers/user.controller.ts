import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationUserBody } from 'src/domain/dtos/authentication.dto';
import { UserUseCases } from 'src/uses-cases/user/user.use-case';

@Controller('users')
export class UserController {
  
  constructor(
    private useCases: UserUseCases
  ) {}
    
  @Post('authentication')
  async postUserAuthentication(@Body() body: AuthenticationUserBody){
    return this.useCases.authenticate(body);
  }
  
}
