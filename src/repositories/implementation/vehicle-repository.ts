import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { PrismaService } from "src/dataBase/prisma.service";
import { VehicleType } from "src/dtos/vehicle-type";
import { AbstractVehicle } from "../interfaces/abstract-vehicle-repository";

@Injectable()
export class VehicleRepository implements AbstractVehicle{
    constructor(
        private prisma: PrismaService
    ){}

    async getVehicles(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const userInfo = plainToClass(VehicleType,vehicleDB)
        
        return userInfo
    }

    async registerVehicle(model: string, vehType: string, space: string, currentKM: number, year: number): Promise<void>  {
        await this.prisma.vehicles.create({
            data:{
                model: model,
                vehType: vehType,
                space: space,
                currentKM: currentKM,
                year: year
            }
        })
    }

    async archiveVehicle(vehicleId: string): Promise<void> {
        await this.prisma.vehicles.update({
            data:{
                isArchived: true
            },
            where:{
                id: vehicleId
            }
        })
    }
}