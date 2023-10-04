import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { ICrudRepository } from "./crud-repository-interface";

export interface IVehicleRepository extends ICrudRepository<VehicleType>{
    getByPlate(plate: string): Promise<VehicleType>;
    // Get
    getPreventiveMaintenance(): Promise<VehicleType[]>;
    getNeedMaintenance(): Promise<VehicleType[]>;
    // Update
    updateVehicleKm(vehicleId: string, newKm: number): Promise<void>;
    updateVehicleKm(vehicleId: string, newKm: number, plate: string, model: string, vehType: string, year: string): Promise<void>;
}