import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "src/domain/repositories/vehicle-repository-interface";
import { PrismaService } from "src/infrastructure/config/prisma.service";

@Injectable()
export class VehiclePersistenceRepository implements IVehicleRepository {
    
    constructor(
        private prisma: PrismaService
    ){}
    
    getByPlate(plate: string): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }

    async create(obj: VehicleType): Promise<VehicleType> {
        const vehicle = await this.prisma.vehicles.create({ data : obj });
        return vehicle;
    }

    update(model: VehicleType): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const userInfo = plainToClass(VehicleType, vehicleDB)
        
        return userInfo;
    }

    async deleteById(vehicleId: string): Promise<VehicleType> {
        const vehicle = await this.prisma.vehicles.update({
            data:{
                isArchived: true
            },
            where:{
                id: vehicleId
            }
        });
        return vehicle; 
    }
    
}
