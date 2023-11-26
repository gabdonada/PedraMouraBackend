import { MaintenanceTotals } from "src/domain/entities/maintenance-totals";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { ScheduledMaintenanceType } from "src/domain/entities/scheduledMaintenance-type";

export abstract class AbstractMaintenance {
    //Get
    abstract getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]>;
    abstract getMaintenanceAllVehicle(): Promise<MaintenanceType[]>;
    abstract getMaintenceTotals(): Promise<MaintenanceTotals[]>;
    abstract getMaintenceByPeriod(date: string): Promise<MaintenanceType[]>;
    abstract getScheduledMaintenance(vehicleId: string, currentDate: string): Promise<ScheduledMaintenanceType[]>;
    abstract getAllScheduledMaintenance(currentDate: string): Promise<ScheduledMaintenanceType[]>;
    abstract getMonthlyCost(): Promise<Object>;

    //Post
    abstract registerMaintenance(body: MaintenanceType): Promise<Object>;
    abstract update(body: MaintenanceType): Promise<void>;
    abstract deleteById(id: string): Promise<Object>;
    abstract scheduleMaintenance(date: string, mainType: string, vehicleId: string): Promise<void>;
}