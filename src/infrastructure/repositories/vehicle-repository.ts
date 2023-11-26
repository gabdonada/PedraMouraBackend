import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "src/domain/repositories/vehicle-repository-interface";
import { PrismaService } from "src/infrastructure/config/prisma.service";

@Injectable()
export class VehiclePersistenceRepository implements IVehicleRepository {
    constructor(
        private prisma: PrismaService
    ){}

    async getById(id: string): Promise<VehicleType> {
        const vehicle = await this.prisma.vehicles.findUnique({
            where:{
                id: id
            }
        });
        return vehicle;
    }

    async getByPlate(plate: string): Promise<VehicleType> {
        const vehicle = await this.prisma.vehicles.findUnique({
            where:{
                plate: plate
            }
        });
        return vehicle;
    }
    
    update(model: VehicleType): Promise<VehicleType> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany({where:{isArchived: false}});

        const vehicle = plainToClass(VehicleType,vehicleDB);
        
        return vehicle
    }

    async create(obj: VehicleType): Promise<VehicleType> {
        const vehicle = await this.prisma.vehicles.create({ data : obj });
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
    
        let preventMaint: VehicleType[] = [];

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

            if (maintenanceDB && maintenanceDB.length > 0) {
            
                const maintenance = plainToClass(MaintenanceType,maintenanceDB);

                const kmDifference = Number(veh.currentKM) - Number(maintenance[0].vehKm);

                if(kmDifference <= 1000){
                    preventMaint.push(veh);
                }
            }
        }

        return preventMaint;
    }

    async getNeedMaintenance(): Promise<VehicleType[]> {
        const vehicleDB = await this.prisma.vehicles.findMany();

        const vehicles = plainToClass(VehicleType,vehicleDB)
    
        let maintenanceTime: VehicleType[] = [];

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

            if (maintenanceDB && maintenanceDB.length > 0) {
                const maintenance = plainToClass(MaintenanceType,maintenanceDB);

                const kmDifference = Number(veh.currentKM) - Number(maintenance[0].vehKm);

                if(kmDifference <= 0){
                    maintenanceTime.push(veh);
                }
            }
        }

        return maintenanceTime;
    }

    async updateVehicle(vehicleId, newKm, plate, model, vehType, year): Promise<void>{
        await this.prisma.vehicles.update({
            data:{
                plate: plate,
                currentKM: newKm,
                model: model,
                year: year,
                vehType: vehType
            },
            where:{
                id: vehicleId
            }
        })
    }
    
}