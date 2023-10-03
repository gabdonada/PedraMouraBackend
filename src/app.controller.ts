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

  @Get('maintenanceByVehicle')
  async getMaintenanceByVehicle(@Body() body: VehicleType){
    await this.maintenance.getMaintenanceByVehicle(body.id);
  }

  @Get('getMaintenanceAllVehicle')
  async getMaintenanceAllVehicle(){
    await this.maintenance.getMaintenanceAllVehicle();
  }

  @Post('registerMaintenance')
  async postRegisterMaintenance(@Body() body: MaintenanceType){
    await this.maintenance.registerMaintenance(
      body.date,
      body.mainType,
      body.vehKm,
      body.totalAmout,
      body.vehicleId
    );
  }

  @Get('getMaintenceTotals')
  async getMaintenceTotals(){
    await this.maintenance.getMaintenceTotals();
  }

  @Get('getMaintenceByPeriod')
  async getMaintenceByPeriod(@Body() body: string){
    await this.maintenance.getMaintenceByPeriod(body);
  }

  @Get('getAllScheduledMaintenances')
  async getAllScheduledMaintenances(@Body() body: string){
    await this.maintenance.getAllScheduledMaintenance(body);
  }

  @Get('getScheduledMaintenancesByCar')
  async getScheduledMaintenances(@Body() body: ScheduledMaintenanceType){
    await this.maintenance.getScheduledMaintenance(body.vehicleId,body.date);
  }

  @Post('scheduleMaintenance')
  async postScheduleMaintenance (@Body() body: ScheduledMaintenanceType){
    await this.maintenance.scheduleMaintenance(body.date, body.mainType, body.vehicleId);
  }

}
