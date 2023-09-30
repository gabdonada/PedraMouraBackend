import { Body, Injectable } from "@nestjs/common";
import { VehicleType } from "src/domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "src/domain/repositories/vehicle-repository-abstract";

@Injectable()
export class VehicleUseCases {

  constructor(
    private repository: IVehicleRepository
  ) {}

  async getVehicles() : Promise<VehicleType[]> {
    return await this.repository.getAll();
  }

  async create(@Body() body: VehicleType) : Promise<VehicleType>{
    const obj = await this.repository.create(
      body.model,
      body.vehType,
      body.space,
      body.currentKM,
      body.year
    );
    return obj;
  }


  async deleteById(@Body() body: VehicleType) : Promise<VehicleType>{
    const obj = await this.repository.deleteById(body.id);
    return obj;
  }

}