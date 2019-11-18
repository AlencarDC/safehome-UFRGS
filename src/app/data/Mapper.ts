interface Mapper<T> {
  toDomain(t: any): T;
  toPersistence(t: T): any;
}