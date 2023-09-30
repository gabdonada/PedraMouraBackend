import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { VehiclePersistenceRepository } from 'src/infrastructure/repositories/vehicle-repository';
import { VehicleUseCases } from './vehicle.use-case';

@Module({
  imports: [],
  providers: [
    {
        provide: 'VehiclePersistenceRepository',
        useClass: VehiclePersistenceRepository
    },
    VehicleUseCases,
    PrismaService
  ],
  exports: [VehicleUseCases],
})
export class VehicleUseCasesModule {}