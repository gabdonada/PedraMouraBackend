import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { PrismaService } from "src/dataBase/prisma.service";
import { MaintenanceType } from "src/dtos/maintenance-type";
import { VehicleType } from "src/dtos/vehicle-type";
import { AbstractVehicle } from "../interfaces/abstract-vehicle-repository";

@Injectable()
export class VehicleRepository implements AbstractVehicle{
    constructor(
        private prisma: PrismaService
    ){}

    async getVehicles(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const vehicle = plainToClass(VehicleType,vehicleDB);
        
        return vehicle
    }

    async registerVehicle(model: string, vehType: string, space: string, currentKM: number, year: number, plate: string): Promise<void>  {
        await this.prisma.vehicles.create({
            data:{
                model: model,
                vehType: vehType,
                space: space,
                currentKM: currentKM,
                year: year,
                plate: plate
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

    async updateVehicleKm(vehicleId: string, newKm: number): Promise<void> {
        await this.prisma.vehicles.update({
            data:{
                currentKM: newKm
            },
            where:{
                id: vehicleId
            }
        })
    }

    async getPreventiveMaintenance(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const vehicles = plainToClass(VehicleType,vehicleDB)
    
        let preventMaint: VehicleType[];

        for(let veh of vehicles){
            const maintenanceDB = await this.prisma.maintenance.findMany({
                where: {
                    vehicleId: veh.id
                },
                orderBy: [{
                    vehKm: 'desc',
                }],
                take: 1
            });

            const maintenance = plainToClass(MaintenanceType,maintenanceDB);

            const kmDifference = Number(veh.currentKM) - Number(maintenance[0].vehKm);

            if(kmDifference <= 1000){
                preventMaint.push(veh);
            }
        }

        return preventMaint;
    }

    async getNeedMaintenance(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const vehicles = plainToClass(VehicleType,vehicleDB)
    
        let maintenanceTime: VehicleType[];

        for(let veh of vehicles){
            const maintenanceDB = await this.prisma.maintenance.findMany({
                where: {
                    vehicleId: veh.id
                },
                orderBy: [{
                    vehKm: 'desc',
                }],
                take: 1
            });

            const maintenance = plainToClass(MaintenanceType,maintenanceDB);

            const kmDifference = Number(veh.currentKM) - Number(maintenance[0].vehKm);

            if(kmDifference <= 0){
                maintenanceTime.push(veh);
            }
        }

        return maintenanceTime;
    }
}