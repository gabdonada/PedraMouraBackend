export abstract class AbstractUserRepository {
    abstract authenticate(code: string): Promise<string>;
}