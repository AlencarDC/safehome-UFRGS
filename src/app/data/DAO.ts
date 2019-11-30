interface DAO<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<boolean>;
  update(t: T): Promise<T>;
  save(t: T): Promise<T>;
  getById(id: string): Promise<T>;
  findAll(selector: string): Promise<T[]>
}

export default DAO;