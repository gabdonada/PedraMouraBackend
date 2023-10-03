import { Module } from '@nestjs/common';
import { UserUseCasesModule } from '../user/user-use-cases.module';
import { AuthUseCases } from './auth.use-case';
import { UserFactoryService } from '../user/user-factory.service';

@Module({
  imports: [UserUseCasesModule],
  providers: [
    AuthUseCases
  ],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}