import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Axios } from 'axios';
import { AppController } from './app.controller';
import { PrismaService } from './dataBase/prisma.service';
import { UserRepository } from './repositories/implementation/user-repository';
import { AbstractUserRepository } from './repositories/interfaces/abstract-user-repository';

@Module({
  imports: [
    JwtModule.register({
      secret: 'spacetime', //it is a secret used to communicate between the services - hardcoded are not recommended
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    JwtService,
    ConfigModule,
    Axios,
    ConfigService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    }
  ],
})
export class AppModule {}
