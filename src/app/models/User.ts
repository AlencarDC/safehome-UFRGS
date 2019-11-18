import Permission from './Permission';


class User {
  private name: string;
  private username: string;
  private password: string;
  private admin: boolean;
  private houseId: string;
  private id?: string;
  //private permissions: Permission;

  public constructor(name: string, username: string, password: string, admin: boolean, houseId: string, userId?: string) {
    this.id = userId ? userId : null;
    this.name = name;
    this.username = username;
    this.password = password;
    this.admin = admin;
    this.houseId = houseId;
  }

  checkPassword(password: string): boolean {
    return (this.password === password);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public isAdmin(): boolean {
    return this.admin;
  }

  public getHouse(): string {
    return this.houseId;
  }
}

export default User;