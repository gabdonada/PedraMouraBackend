import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationUserBody } from 'src/domain/dtos/authentication.dto';
import { AuthUseCases } from 'src/uses-cases/auth/auth.use-case';

@Controller('github')
export class GitAutheticationController {
  
  constructor(
    private authUseCases: AuthUseCases
  ) {}
    
  @Post('authentication')
  async authenticateGithub(@Body() body: AuthenticationUserBody){
    return this.authUseCases.authenticateGithub(body);
  }
  
}
