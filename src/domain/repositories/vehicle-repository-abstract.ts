import { VehicleType } from "src/domain/entities/vehicle-type.entity";

export abstract class IVehicleRepository {
    abstract getAll(): Promise<VehicleType[]>;
    abstract create(model: string, vehType: string, space: string, currentKM: number, year: number): Promise<VehicleType>;
    abstract deleteById(vehicleId: string): Promise<VehicleType>;
}