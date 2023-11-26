import { Injectable, BadRequestException } from "@nestjs/common";
import { MaintenanceTotals } from "src/domain/entities/maintenance-totals";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { ScheduledMaintenanceType } from "src/domain/entities/scheduledMaintenance-type";
import { AbstractMaintenance } from "src/domain/repositories/abstract-maintenance";
import { VehicleUseCases } from "../vehicle/vehicle.use-case";

@Injectable()
export class MaintenanceUseCases {

  constructor(
    private repository: AbstractMaintenance,
    private vehicleUsesCases: VehicleUseCases
  ) {}

  async getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]> {
    return await this.repository.getMaintenanceByVehicle(vehicleId);
  }

  async getMaintenanceAllVehicle(): Promise<MaintenanceType[]> {
    const maintenanceList = await this.repository.getMaintenanceAllVehicle();
    if (maintenanceList && maintenanceList.length > 0) {
      for (const obj of maintenanceList) {
        const vehicle = await this.vehicleUsesCases.getById(obj.vehicleId);
        if (vehicle && vehicle.plate) {
          obj.plate = vehicle.plate;
        }
      }
    }
    return maintenanceList;
  }

  async registerMaintenance(body: MaintenanceType): Promise<Object> {
    if (body.plate) {
      const vehicle = await this.vehicleUsesCases.getByPlate(body.plate);
      if (vehicle && vehicle.id) {
        body.vehicleId = vehicle.id;
      } else {
        throw new BadRequestException("Placa não encontrada!");
      }
    }
    return await this.repository.registerMaintenance(body);
  }

  async update(body: MaintenanceType): Promise<void> {
    return await this.repository.update(body);
  }

  async deleteById(id: string): Promise<Object> {
    return await this.repository.deleteById(id);
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