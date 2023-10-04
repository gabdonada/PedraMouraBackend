import { Body, Controller, Get, Post } from '@nestjs/common';
import { MaintenanceType } from './domain/entities/maintenance-type';
import { ScheduledMaintenanceType } from './domain/entities/scheduledMaintenance-type';
import { VehicleType } from './domain/entities/vehicle-type.entity';
import { AbstractMaintenance } from './domain/repositories/abstract-maintenance';


@Controller()
export class AppController {
  constructor(
    private maintenance: AbstractMaintenance
    ) {}

  @Get()
  async get(){
    return "Bem vindo a API da Pedra Moura !";
  }

  @Get('maintenance/maintenance-by-vehicle')
  async getMaintenanceByVehicle(@Body() body: VehicleType){
    await this.maintenance.getMaintenanceByVehicle(body.id);
  }

  @Get('maintenance/get-maintenance-all-vehicle')
  async getMaintenanceAllVehicle(){
    await this.maintenance.getMaintenanceAllVehicle();
  }

  @Post('maintenance/register-maintenance')
  async postRegisterMaintenance(@Body() body: MaintenanceType){
    await this.maintenance.registerMaintenance(
      body.date,
      body.mainType,
      body.vehKm,
      body.totalAmout,
      body.vehicleId
    );
  }

  @Get('maintenance/get-maintence-totals')
  async getMaintenceTotals(){
    await this.maintenance.getMaintenceTotals();
  }

  @Get('maintenance/get-maintence-by-period')
  async getMaintenceByPeriod(@Body() body: string){
    await this.maintenance.getMaintenceByPeriod(body);
  }

  @Get('maintenance/get-all-scheduled-maintenances')
  async getAllScheduledMaintenances(@Body() body: string){
    await this.maintenance.getAllScheduledMaintenance(body);
  }

  @Get('maintenance/get-scheduled-maintenances-by-car')
  async getScheduledMaintenances(@Body() body: ScheduledMaintenanceType){
    await this.maintenance.getScheduledMaintenance(body.vehicleId,body.date);
  }

  @Post('maintenance/schedule-maintenance')
  async postScheduleMaintenance (@Body() body: ScheduledMaintenanceType){
    await this.maintenance.scheduleMaintenance(body.date, body.mainType, body.vehicleId);
  }

}
