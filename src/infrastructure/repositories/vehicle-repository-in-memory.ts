import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "src/domain/repositories/vehicle-repository-interface";

export class VehicleInMemoryRepository implements IVehicleRepository {
    
    constructor(){}
    
    getById(id: string): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }
    
    updateVehicle(vehicleId: string, newKm: number, plate: string, model: string, vehType: string, year: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    getPreventiveMaintenance(): Promise<VehicleType[]> {
        throw new Error("Method not implemented.");
    }
    getNeedMaintenance(): Promise<VehicleType[]> {
        throw new Error("Method not implemented.");
    }
    updateVehicleKm(vehicleId: string, newKm: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getByPlate(plate: string): Promise<VehicleType> {
        const obj : VehicleType = {
            "id": "34782564-45ca-4fba-b47f-8b0fbf70a885",
            "currentKM": 10000,
            "model": "Palio",
            "year": 2010,
            "vehType": "Hatch",
            "space": "5 pessoas",
            "isArchived": false,
            "plate": "IQN-4901"
        };
        return obj.plate == plate ? obj : undefined;
    }
    
    async create(model: VehicleType): Promise<VehicleType> {
        model.id = '23782564-45ca-4fba-b47f-8b0fbf95x'
        return model;
    }
    
    update(model: VehicleType): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<VehicleType[]> {
        const vehicles = [
            {
            "id": "34782564-45ca-4fba-b47f-8b0fbf70a885",
            "currentKM": 10000,
            "model": "Palio",
            "year": 2010,
            "vehType": "Hatch",
            "space": "5 pessoas",
            "isArchived": false,
            "plate": "IQN-4901"
        }];
        return vehicles;
    }

    async createWithAttributes(model: string, vehType: string, space: string, currentKM: number, year: number): Promise<VehicleType>  {
        throw new Error("Method not implemented.");
    }

    async deleteById(vehicleId: string): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }
}