
export interface ICrudRepository<T>  {
    getAll(): Promise<T[]>;
    create(model: T): Promise<T>;
    update(model: T): Promise<T>;
    deleteById(id: string): Promise<T>;
}