import { MaintenanceTotals } from "src/dtos/maintenance-totals";
import { MaintenanceType } from "src/dtos/maintenance-type";

export abstract class AbstractMaintenance {
    //Get
    abstract getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]>;
    abstract getMaintenanceAllVehicle(): Promise<MaintenanceType[]>;
    abstract getMaintenceTotals(): Promise<MaintenanceTotals[]>;
    abstract getMaintenceByPeriod(date: string): Promise<MaintenanceType[]>;

    //Post
    abstract registerMaintenance(date: string, mainType: string, vehKm: number, totalAmout: number , vehicleId: string): Promise<void>;
}