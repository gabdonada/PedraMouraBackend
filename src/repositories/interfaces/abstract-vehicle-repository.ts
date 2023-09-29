import { VehicleType } from "src/dtos/vehicle-type";

export abstract class AbstractVehicle {
    // Get
    abstract getVehicles(): Promise<VehicleType[]>;
    abstract getPreventiveMaintenance(): Promise<VehicleType[]>;
    abstract getNeedMaintenance(): Promise<VehicleType[]>;

    
    // Post
    abstract registerVehicle(model: string, vehType: string, space: string, currentKM: number, year: number, plate: string): Promise<void>;

    // Update
    abstract archiveVehicle(vehicleId: string): Promise<void>;
    abstract updateVehicleKm(vehicleId: string, newKm: number): Promise<void>;
}