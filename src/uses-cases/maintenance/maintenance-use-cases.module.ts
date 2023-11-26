import { Module } from '@nestjs/common';
import { AbstractMaintenance } from 'src/domain/repositories/abstract-maintenance';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { MaintenanceUseCases } from './maintenance.use-case';
import { MaintenancePersistenceRepository } from 'src/infrastructure/repositories/maintenance-repository';
import { VehicleUseCases } from '../vehicle/vehicle.use-case';
import { VehicleUseCasesModule } from '../vehicle/vehicle-use-cases.module';

@Module({
  imports: [
    VehicleUseCasesModule
  ],
  providers: [
    {
        provide: AbstractMaintenance,
        useClass: MaintenancePersistenceRepository
    },
    PrismaService,
    MaintenanceUseCases,
  ],
  exports: [MaintenanceUseCases],
})
export class MaintenanceUseCasesModule {}