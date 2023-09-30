import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { ICrudRepository } from "./crud-repository-interface";

export interface IVehicleRepository extends ICrudRepository<VehicleType>{
    getByPlate(plate: string): Promise<VehicleType>;
}