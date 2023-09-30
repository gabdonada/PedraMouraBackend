import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { PrismaService } from "src/infrastructure/config/prisma.service";
import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "src/domain/repositories/vehicle-repository-abstract";

@Injectable()
export class VehicleRepository implements IVehicleRepository {
    
    constructor(
        private prisma: PrismaService
    ){}

    async getAll(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const userInfo = plainToClass(VehicleType, vehicleDB)
        
        return userInfo;
    }

    async create(model: string, vehType: string, space: string, currentKM: number, year: number): Promise<VehicleType>  {
        const vehicle = await this.prisma.vehicles.create({
            data:{
                model: model,
                vehType: vehType,
                space: space,
                currentKM: currentKM,
                year: year
            }
        })
        return vehicle;
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