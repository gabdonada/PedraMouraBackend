import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUseCases } from 'src/uses-cases/auth/auth.use-case';

@Controller('google/authentication')
export class GoogleAutheticationController {
  
    constructor(
        private authUseCases: AuthUseCases
    ) {}

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth(){}

    @Get('callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req){
        return this.authUseCases.authenticateGoogle(req);
    }
  
}
