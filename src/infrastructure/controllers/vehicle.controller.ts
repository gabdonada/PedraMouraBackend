import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { VehicleType } from '../../domain/entities/vehicle-type.entity';
import { VehicleUseCases } from '../../uses-cases/vehicle/vehicle.use-case';


@Controller('vehicles')
export class VehiclesController {
  
  constructor(
    private usesCases: VehicleUseCases
  ) {}

  @Get()
  async getAll(){
    return this.usesCases.getVehicles();
  }

  @Post()
  async create(@Body() body: VehicleType){
    return this.usesCases.create(body);
  }

  @Put()
  async archiveVehicle(@Body() body: VehicleType){
    return this.usesCases.deleteById(body);
  }

  @Put('update-vehicle-km')
  async updateVehicleKm(@Body() body:{vehicleId: string, newKm: number}){
    await this.usesCases.updateVehicleKm(body);
  }

  @Get('get-preventive-maintenance')
  async getPreventiveMaintenance(){
    await this.usesCases.getPreventiveMaintenance();
  }

  @Get('get-need-maintenance')
  async getNeedMaintenance(){
    await this.usesCases.getNeedMaintenance();
  }

}
