
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateVehicleDto } from "../../../src/domain/dtos/vehicle-type.dto";
import { stringified } from "../../../src/infrastructure/utils/json-functions";

describe('VehicleController', () => {

  describe('test field currentKm', () => {
    it('should fail on invalid currentKm', async () => {
      const myBodyObject = { model: 'Palio', currentKM: -1}
      const myDtoObject = plainToInstance(CreateVehicleDto, myBodyObject)
      const errors = await validate(myDtoObject)
      expect(errors.length).not.toBe(0)
      expect(stringified(errors)).toContain(`KM inválida`);
    });

  });

  describe('test field plate', () => {
    it('should fail on invalid plate', async () => {
      const myBodyObject = { model: 'Palio', plate: '-1'}
      const myDtoObject = plainToInstance(CreateVehicleDto, myBodyObject)
      const errors = await validate(myDtoObject)
      expect(errors.length).not.toBe(0)
      expect(stringified(errors)).toContain(`Placa inválida`)
    });

    it('should valid Brazilian plate', async () => {
      const myBodyObject = { model: 'Palio', currentKM: 10,  plate: 'CMG3164'}
      const myDtoObject = plainToInstance(CreateVehicleDto, myBodyObject)
      const errors = await validate(myDtoObject);
      expect(errors.length).toBe(0);
    });

    it('should valid Mercosul Plate', async () => {
      const myBodyObject = { model: 'Palio', currentKM: 10,  plate: 'BRD1B52'}
      const myDtoObject = plainToInstance(CreateVehicleDto, myBodyObject)
      const errors = await validate(myDtoObject);
      expect(errors.length).toBe(0);
    });

  });

});