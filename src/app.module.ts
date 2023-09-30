import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Axios } from 'axios';
import { AppController } from './app.controller';
import { PrismaService } from './infrastructure/config/prisma.service';
import { UserUseCases } from './uses-cases/user/user.use-case';
import { VehicleUseCasesModule } from './uses-cases/vehicle/vehicle-use-cases.module';
import { UserUseCasesModule } from './uses-cases/user/user-use-cases.module';
import { VehiclesController } from './infrastructure/controllers/vehicle.controller';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'pedramoura', //it is a secret used to communicate between the services - hardcoded are not recommended
    }),
    VehicleUseCasesModule,
    UserUseCasesModule
  ],
  controllers: [
    AppController, 
    UserController,
    VehiclesController
  ],
  providers: [],
})
export class AppModule {}
