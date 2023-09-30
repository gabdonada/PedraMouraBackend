import { Injectable } from "@nestjs/common";
import { AuthenticationUserBody } from "src/domain/dtos/authentication.dto";
import { IUserRepository } from "src/domain/repositories/user-repository-abstract";

@Injectable()
export class UserUseCases {

  constructor(
    private repository: IUserRepository
  ) {}

  async authenticate(dto: AuthenticationUserBody): Promise<String> {
    const { code } = dto;
    return await this.repository.authenticate(code);
  }

}