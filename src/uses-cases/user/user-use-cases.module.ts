import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user-repository-abstract';
import { UserRepository } from 'src/infrastructure/repositories/user-repository';
import { UserUseCases } from './user.use-case';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Axios } from 'axios';

@Module({
  imports: [],
  providers: [
    {
        provide: IUserRepository,
        useClass: UserRepository
    },
    UserUseCases,
    PrismaService,
    JwtService,
    ConfigService
  ],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}