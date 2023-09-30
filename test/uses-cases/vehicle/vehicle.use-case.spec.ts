
import { CreateVehicleDto } from "../../../src/domain/dtos/vehicle-type.dto";
import { VehicleInMemoryRepository } from "../../../src/infrastructure/repositories/vehicle-repository-in-memory";
import { VehicleUseCases } from "../../../src/uses-cases/vehicle/vehicle.use-case";

describe('VehicleUseCases', () => {
  
  let service: VehicleUseCases;
  let repository: VehicleInMemoryRepository;

  beforeEach(() => {
    repository = new VehicleInMemoryRepository();
    service = new VehicleUseCases(repository);
  });

  describe('test create vehicle', () => {
    it('should return error when plate exists in database', async () => {
        const dto : CreateVehicleDto = {
          currentKM: 10000,
          model: "Palio",
          year: 2010,
          vehType: "Hatch",
          space: "5 pessoas",
          isArchived: false,
          plate: "IQN-4901"
        };
        await expect(service.create(dto)).rejects.toThrow(new Error("O veiculo já existe no banco de dados."));
    });

    it('should return success', async () => {
      const dto : CreateVehicleDto = {
        currentKM: 10000,
        model: "Palio",
        year: 2010,
        vehType: "Hatch",
        space: "5 pessoas",
        isArchived: false,
        plate: "XXX-0000"
      };
      const entity = await service.create(dto);
      expect(entity).not.toBeNull();
      expect(entity.plate).toBe(dto.plate);
    });
    
  });

});