import { VehicleType } from "src/dtos/vehicle-type";

export abstract class AbstractVehicle {
    //Get
    abstract getVehicles(): Promise<VehicleType[]>;
    
    //Post
    abstract registerVehicle(model: string, vehType: string, space: string, currentKM: number, year: number): Promise<void>;
    abstract archiveVehicle(vehicleId: string): Promise<void>;
}