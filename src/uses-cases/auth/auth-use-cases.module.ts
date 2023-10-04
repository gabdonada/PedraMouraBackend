import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserUseCasesModule } from '../user/user-use-cases.module';
import { AuthUseCases } from './auth.use-case';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UserUseCasesModule
  ],
  providers: [
    AuthUseCases
  ],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}