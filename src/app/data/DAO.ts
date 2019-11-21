interface DAO<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<boolean>;
  save(t: T): Promise<T>;
}

export default DAO;