import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AbstractUserRepository } from './repositories/interfaces/abstract-user-repository';
import { AuthenticationUserBody } from './dtos/authentication-body';
import { AbstractVehicle } from './repositories/interfaces/abstract-vehicle-repository';
import { VehicleType } from './dtos/vehicle-type';

@Controller('api')
export class AppController {
  constructor(
    private createNewUserRepository: AbstractUserRepository,
    private vehicle: AbstractVehicle
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

}
