import { plainToClass } from "class-transformer";
import { PrismaService } from "src/dataBase/prisma.service";
import { MaintenanceTotals } from "src/dtos/maintenance-totals";
import { MaintenanceType } from "src/dtos/maintenance-type";
import { AbstractMaintenance } from "../interfaces/abstract-maintenance";


export class Maintenance implements AbstractMaintenance {
    constructor(
        private prisma: PrismaService,
    ){}

    async getMaintenanceByVehicle(vehicleId: string): Promise<MaintenanceType[]> {
        const maintenance = await this.prisma.maintenance.findMany({
            where:{
              vehicleId: vehicleId,
            }
          })

        const maintenanceInfo = plainToClass(MaintenanceType,maintenance)

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

}