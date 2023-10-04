import { BadRequestException, Body, Inject, Injectable } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { CreateVehicleDto } from "src/domain/dtos/vehicle-type.dto";
import { VehicleType } from "../../domain/entities/vehicle-type.entity";
import { IVehicleRepository } from "../../domain/repositories/vehicle-repository-interface";

@Injectable()
export class VehicleUseCases {

  constructor(
    @Inject('VehiclePersistenceRepository')
    private repository: IVehicleRepository
  ) {}

  async getVehicles() : Promise<VehicleType[]> {
    return await this.repository.getAll();
  }

  async create(dto: CreateVehicleDto) : Promise<VehicleType>{
    let entity = this.convertDtoToEntity(dto);
    const databaseEntity = await this.getByPlate(entity);
    if (databaseEntity && databaseEntity.id) {
      throw new BadRequestException("O veiculo já existe no banco de dados.");
    }
    entity = await this.repository.create(entity);
    return entity;
  }

  convertDtoToEntity(dto: CreateVehicleDto) : VehicleType {
    const data = classToPlain(dto);
    const entity = plainToClass(VehicleType, data);
    return entity;
  }


  async deleteById(@Body() body: VehicleType) : Promise<VehicleType>{
    const obj = await this.repository.deleteById(body.id);
    return obj;
  }

  async getByPlate(@Body() body: VehicleType) : Promise<VehicleType>{
    const obj = await this.repository.getByPlate(body.plate);
    return obj;
  }

  async updateVehicleKm(body:{vehicleId: string, newKm: number}) {
    return await this.repository.updateVehicleKm(body.vehicleId, body.newKm);
  }

  async updateVehicle(body:{vehicleId: string, newKm: number, plate: string, model: string, vehType: string, year: string}) {
    return await this.repository.updateVehicleKm(body.vehicleId, body.newKm, body.plate, body.model, body.vehType, body.year);
  }

  async getPreventiveMaintenance() {
    return await this.repository.getPreventiveMaintenance();
  }

  async getNeedMaintenance() {
    return await this.repository.getNeedMaintenance();
  }

}