import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Put,
  UseGuards, 
} from '@nestjs/common';
import { VehicleType } from '../../domain/entities/vehicle-type.entity';
import { VehicleUseCases } from '../../uses-cases/vehicle/vehicle.use-case';
import { AuthGuard } from 'src/uses-cases/auth/auth.guard';

@Controller('vehicles')
export class VehiclesController {
  
  constructor(
    private usesCases: VehicleUseCases
  ) {}

  // @UseGuards(AuthGuard)
  @Get()
  async getAll(){
    return this.usesCases.getVehicles();
  }

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: VehicleType){
    return this.usesCases.create(body);
  }

  // @UseGuards(AuthGuard)
  @Put()
  async archiveVehicle(@Body() body: VehicleType){
    return this.usesCases.deleteById(body);
  }

  // @UseGuards(AuthGuard)
  @Put('update-vehicle-km')
  async updateVehicleKm(@Body() body:{vehicleId: string, newKm: number}){
    return await this.usesCases.updateVehicleKm(body);
  }

  @Put('update-vehicle')
  async updateVehicle(@Body() body:{vehicleId: string, newKm: number, plate: string, model: string, vehType: string, year: number}){
    await this.usesCases.updateVehicle(body);
  }

  // @UseGuards(AuthGuard)
  @Get('get-preventive-maintenance')
  async getPreventiveMaintenance(){
    return await this.usesCases.getPreventiveMaintenance();
  }

  // @UseGuards(AuthGuard)
  @Get('get-need-maintenance')
  async getNeedMaintenance(){
    return await this.usesCases.getNeedMaintenance();
  }

}
