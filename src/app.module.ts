import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { PrismaService } from './dataBase/prisma.service';
import { UserRepository } from './repositories/implementation/prisma/user-repository';
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
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    }
  ],
})
export class AppModule {}
