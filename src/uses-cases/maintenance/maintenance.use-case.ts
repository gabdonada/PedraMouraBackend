import { Injectable } from "@nestjs/common";
import { MaintenanceTotals } from "src/domain/entities/maintenance-totals";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { ScheduledMaintenanceType } from "src/domain/entities/scheduledMaintenance-type";
import { AbstractMaintenance } from "src/domain/repositories/abstract-maintenance";

@Injectable()
export class MaintenanceUseCases {

  constructor(
    private repository: AbstractMaintenance
  ) {}

  async getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]> {
    return await this.repository.getMaintenanceByVehicle(vehicleId);
  }

  async getMaintenanceAllVehicle(): Promise<MaintenanceType[]> {
    return await this.repository.getMaintenanceAllVehicle();
  }

  async registerMaintenance(date: string, mainType: string, vehKm: number, totalAmout: number, vehicleId: string): Promise<void> {
    return await this.repository.registerMaintenance(date, mainType, vehKm, totalAmout, vehicleId);
  }

  async getMaintenceTotals(): Promise<MaintenanceTotals[]> {
    return await this.repository.getMaintenceTotals();
  }
    
  async getMaintenceByPeriod(date: string): Promise<MaintenanceType[]> {
    return await this.repository.getMaintenceByPeriod(date);
  }

  async scheduleMaintenance(date: string, mainType: string, vehicleId: string): Promise<void> {
      return await this.repository.scheduleMaintenance(date, mainType, vehicleId);
  }

  async getAllScheduledMaintenance(currentDate: string): Promise<ScheduledMaintenanceType[]> {
      return await this.repository.getAllScheduledMaintenance(currentDate);
  }

  async getScheduledMaintenance(vehicleId: string, currentDate: string): Promise<ScheduledMaintenanceType[]> {
      return await this.repository.getScheduledMaintenance(vehicleId, currentDate);
  }

  async getMonthlyCost(): Promise<Object> {
    return await this.repository.getMonthlyCost();
}

}