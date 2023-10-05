import { Body, Controller, Get, Post } from "@nestjs/common";
import { MaintenanceType } from "src/domain/entities/maintenance-type";
import { ScheduledMaintenanceType } from "src/domain/entities/scheduledMaintenance-type";
import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { MaintenanceUseCases } from "src/uses-cases/maintenance/maintenance.use-case";

@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private maintenance: MaintenanceUseCases
    ) {}

  @Get('maintenance-by-vehicle')
  async getMaintenanceByVehicle(@Body() body: VehicleType){
    return await this.maintenance.getMaintenanceByVehicle(body.id);
  }

  @Get('get-maintenance-all-vehicle')
  async getMaintenanceAllVehicle(){
    return await this.maintenance.getMaintenanceAllVehicle();
  }

  @Post('register-maintenance')
  async postRegisterMaintenance(@Body() body: MaintenanceType){
    await this.maintenance.registerMaintenance(
      body.date,
      body.mainType,
      body.vehKm,
      body.totalAmout,
      body.vehicleId
    );
  }

  @Get('get-maintence-totals')
  async getMaintenceTotals(){
    await this.maintenance.getMaintenceTotals();
  }

  @Get('get-maintence-by-period')
  async getMaintenceByPeriod(@Body() body: string){
    await this.maintenance.getMaintenceByPeriod(body);
  }

  @Get('get-all-scheduled-maintenances')
  async getAllScheduledMaintenances(@Body() body: string){
    await this.maintenance.getAllScheduledMaintenance(body);
  }

  @Get('get-scheduled-maintenances-by-car')
  async getScheduledMaintenances(@Body() body: ScheduledMaintenanceType){
    await this.maintenance.getScheduledMaintenance(body.vehicleId,body.date);
  }

  @Get('get-monthly-cost')
  async getMonthlyCost(){
    return await this.maintenance.getMonthlyCost();
  }

  @Post('schedule-maintenance')
  async postScheduleMaintenance (@Body() body: ScheduledMaintenanceType){
    await this.maintenance.scheduleMaintenance(body.date, body.mainType, body.vehicleId);
  }

}
