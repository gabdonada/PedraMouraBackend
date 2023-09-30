import { Module } from '@nestjs/common';
import { IVehicleRepository } from 'src/domain/repositories/vehicle-repository-abstract';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { VehicleRepository } from 'src/infrastructure/repositories/vehicle-repository';
import { VehicleUseCases } from './vehicle.use-case';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [
    {
        provide: IVehicleRepository,
        useClass: VehicleRepository
    },
    VehicleUseCases,
    PrismaService
  ],
  exports: [VehicleUseCases],
})
export class VehicleUseCasesModule {}