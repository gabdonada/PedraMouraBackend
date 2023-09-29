import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AbstractUserRepository } from './repositories/interfaces/abstract-user-repository';
import { AuthenticationUserBody } from './dtos/authentication-body';
import { AbstractVehicle } from './repositories/interfaces/abstract-vehicle-repository';
import { VehicleType } from './dtos/vehicle-type';
import { AbstractMaintenance } from './repositories/interfaces/abstract-maintenance';
import { MaintenanceType } from './dtos/maintenance-type';

@Controller('api')
export class AppController {
  constructor(
    private createNewUserRepository: AbstractUserRepository,
    private vehicle: AbstractVehicle,
    private maintenance: AbstractMaintenance
    ) {}
    

  @Post('userauthentication')
  async postUserAuthentication(@Body() body: AuthenticationUserBody){
    const { code } = body;

    await this.createNewUserRepository.authenticate(code);
  }

  @Get('getvehicles')
  async getVehicles(){
    await this.vehicle.getVehicles();
  }

  @Post('registerVehicle')
  async postVehicle(@Body() body: VehicleType){
    await this.vehicle.registerVehicle(
      body.model,
      body.vehType,
      body.space,
      body.currentKM,
      body.year,
      body.plate
    );
  }

  @Put('archiveVehicle')
  async putArchiveVehicle(@Body() body: VehicleType){
    await this.vehicle.archiveVehicle(body.id);
  }

  @Get('maintenanceByVehicle')
  async getMaintenanceByVehicle(@Body() body: VehicleType){
    await this.maintenance.getMaintenanceByVehicle(body.id);
  }

  @Get('getMaintenanceAllVehicle')
  async getMaintenanceAllVehicle(){
    await this.maintenance.getMaintenanceAllVehicle();
  }

  @Get('registerMaintenance')
  async registerMaintenance(@Body() body: MaintenanceType){
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

  @Put('updateVehicleKm')
  async updateVehicleKm(@Body() body:{vehicleId: string, newKm: number}){
    await this.vehicle.updateVehicleKm(body.vehicleId, body.newKm)
  }

  @Get('getPreventiveMaintenance')
  async getPreventiveMaintenance(){
    await this.vehicle.getPreventiveMaintenance();
  }

  @Get('getNeedMaintenance')
  async getNeedMaintenance(){
    await this.vehicle.getNeedMaintenance();
  }
}
