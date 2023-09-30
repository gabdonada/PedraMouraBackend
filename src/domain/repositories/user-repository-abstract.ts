export abstract class IUserRepository {
    abstract authenticate(code: string): Promise<string>;
}