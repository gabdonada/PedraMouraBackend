import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Axios } from 'axios';
import { AppController } from './app.controller';
import { PrismaService } from './dataBase/prisma.service';
import { Maintenance } from './repositories/implementation/maintenance';
import { UserRepository } from './repositories/implementation/user-repository';
import { VehicleRepository } from './repositories/implementation/vehicle-repository';
import { AbstractMaintenance } from './repositories/interfaces/abstract-maintenance';
import { AbstractUserRepository } from './repositories/interfaces/abstract-user-repository';
import { AbstractVehicle } from './repositories/interfaces/abstract-vehicle-repository';

@Module({
  imports: [
    JwtModule.register({
      secret: 'pedramoura', //it is a secret used to communicate between the services - hardcoded are not recommended
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
    },{
      provide: AbstractVehicle,
      useClass: VehicleRepository
    },{
      provide: AbstractMaintenance,
      useClass: Maintenance
    }
  ],
})
export class AppModule {}
