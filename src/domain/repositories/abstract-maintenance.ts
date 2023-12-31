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

    //Post
    abstract registerMaintenance(date: string, mainType: string, vehKm: number, totalAmout: number , vehicleId: string): Promise<void>;
    abstract scheduleMaintenance(date: string, mainType: string, vehicleId: string): Promise<void>;
}