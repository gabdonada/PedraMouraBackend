import { User } from "../entities/user.entity";

export abstract class IUserRepository {
    abstract authenticate(body: any): Promise<string>;
    abstract create(userInfo: User): Promise<User>;
    abstract findUnique(userInfo: User): Promise<User>
}