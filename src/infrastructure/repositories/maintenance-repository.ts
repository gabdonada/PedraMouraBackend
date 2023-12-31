import { plainToClass } from "class-transformer";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { PrismaService } from "../config/prisma.service";
import { AbstractMaintenance } from "src/domain/repositories/abstract-maintenance";
import { MaintenanceTotals } from "src/domain/entities/maintenance-totals";
import { ScheduledMaintenanceType } from "src/domain/entities/scheduledMaintenance-type";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaintenancePersistenceRepository implements AbstractMaintenance {

    constructor(
        private prisma: PrismaService,
    ){}

    async getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]> {
        const maintenance = await this.prisma.maintenance.findMany({
            where:{
                vehicleId: vehicleId,
            }
        });
        
        const maintenanceInfo = plainToClass(MaintenanceType, maintenance)

        return maintenanceInfo
    }

    async getMaintenanceAllVehicle(): Promise<MaintenanceType[]> {
        const maintenance = await this.prisma.maintenance.findMany()
        
        const maintenanceInfo = plainToClass(MaintenanceType,maintenance)

        return maintenanceInfo
    }

    async registerMaintenance(date: string, mainType: string, vehKm: number, totalAmout: number, vehicleId: string): Promise<void> {
        await this.prisma.maintenance.create({
            data:{
                date: date,
                mainType: mainType,
                vehKm: vehKm,
                totalAmout: totalAmout,
                vehicleId: vehicleId
            }
        })
    }

    async getMaintenceTotals(): Promise<MaintenanceTotals[]> {
        const maintenance = await this.prisma.maintenance.groupBy({
            by: ['date'],
            _sum: {
                totalAmout: true
            }
        })
        
        const maintenanceInfo = plainToClass(MaintenanceTotals,maintenance)

        return maintenanceInfo
    }

    async getMaintenceByPeriod(date: string): Promise<MaintenanceType[]> {
        const maintenance = await this.prisma.maintenance.findMany({
            where:{
                date: date
            }
        })

        const maintenanceInfo = plainToClass(MaintenanceType,maintenance);

        return maintenanceInfo

    }

    async scheduleMaintenance(date: string, mainType: string, vehicleId: string): Promise<void> {
        await this.prisma.scheduledMaintenance.create({
            data:{
                date: date,
                mainType: mainType,
                vehicleId: vehicleId
            }
        })
    }

    async getAllScheduledMaintenance(currentDate: string): Promise<ScheduledMaintenanceType[]> {
        const maintenance = await this.prisma.scheduledMaintenance.findMany({
            where:{
                date:{
                    //maybe we will need to look at this by the formating that we are saving it. Maybe we will need to convert before filtering
                  gte: currentDate  
                } 
            }
        })

        const maintenanceInfo = plainToClass(ScheduledMaintenanceType,maintenance);

        return maintenanceInfo
    }

    async getScheduledMaintenance(vehicleId: string, currentDate: string): Promise<ScheduledMaintenanceType[]> {
        const maintenance = await this.prisma.scheduledMaintenance.findMany({
            where:{
                date:{
                    //maybe we will need to look at this by the formating that we are saving it. Maybe we will need to convert before filtering
                  gte: currentDate  
                },
                vehicleId: vehicleId
            }
        })

        const maintenanceInfo = plainToClass(ScheduledMaintenanceType,maintenance);

        return maintenanceInfo    
    }

}