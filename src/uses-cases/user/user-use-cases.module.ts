import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/domain/repositories/user-repository-abstract';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { UserRepository } from 'src/infrastructure/repositories/user-repository';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-case';

@Module({
  imports: [],
  providers: [
    {
        provide: IUserRepository,
        useClass: UserRepository
    },
    UserUseCases,
    UserFactoryService,
    PrismaService,
    JwtService,
    ConfigService
  ],
  exports: [UserUseCases, UserFactoryService],
})
export class UserUseCasesModule {}