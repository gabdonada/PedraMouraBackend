import { Injectable } from "@nestjs/common";
import { AuthenticationUserBody } from "src/domain/dtos/authentication.dto";
import { IUserRepository } from "src/domain/repositories/user-repository-abstract";
import { UserFactoryService } from "./user-factory.service";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class UserUseCases {

  constructor(
    private repository: IUserRepository,
    private factory: UserFactoryService
  ) {}

  async authenticateGithub(dto: AuthenticationUserBody): Promise<String> {
    const { code } = dto;
    return await this.repository.authenticate(code);
  }

  async create(type: String, obj: any): Promise<User> {
    const userEntity = this.factory.createNewUserByPlatformType(type, obj);
    return await this.repository.create(userEntity);
  }

  async findByUnique(type: String, obj: any): Promise<User> {
    const userEntity = this.factory.createNewUserByPlatformType(type, obj);
    return await this.repository.findUnique(userEntity);
  }
  
}