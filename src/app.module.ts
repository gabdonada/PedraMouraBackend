import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Axios } from 'axios';
import { AppController } from './app.controller';
import { AbstractMaintenance } from './domain/repositories/abstract-maintenance';
import { GoogleStrategy } from './infrastructure/config/google.stategy';
import { PrismaService } from './infrastructure/config/prisma.service';
import { GitAutheticationController } from './infrastructure/controllers/github-authetication.controller';
import { GoogleAutheticationController } from './infrastructure/controllers/google-authetication.controller';
import { VehiclesController } from './infrastructure/controllers/vehicle.controller';
import { Maintenance } from './infrastructure/repositories/maintenance';
import { AuthUseCasesModule } from './uses-cases/auth/auth-use-cases.module';
import { UserUseCasesModule } from './uses-cases/user/user-use-cases.module';
import { VehicleUseCasesModule } from './uses-cases/vehicle/vehicle-use-cases.module';


@Module({
  imports: [
    JwtModule.register({
      secret: 'pedramoura', //it is a secret used to communicate between the services - hardcoded are not recommended
    }),
    AuthUseCasesModule,
    UserUseCasesModule,
    VehicleUseCasesModule
  ],
  controllers: [
    AppController,
    VehiclesController,
    GoogleAutheticationController,
    GitAutheticationController
  ],
  providers: [
    {
      provide: AbstractMaintenance,
      useClass: Maintenance
    },
    GoogleStrategy
  ]
})
export class AppModule {}
