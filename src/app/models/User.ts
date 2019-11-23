import Permission from './Permission';


class User {
  private name: string;
  private username: string;
  private password: string;
  private admin: boolean;
  private houseId: string;
  private permissions: Permission;
  private id?: string;
  //private permissions: Permission;

  public constructor(name: string, username: string, password: string, admin: boolean, houseId: string, locks: boolean, eletrics: boolean, userId?: string) {
    this.id = userId ? userId : null;
    this.name = name;
    this.username = username;
    this.password = password;
    this.admin = admin;
    this.houseId = houseId;
    if (admin === true) {
      this.permissions = new Permission(true, true);
    } else {
      this.permissions = new Permission(locks, eletrics);
    }
  }

  public validate(): boolean {
    const minPasswordLength = 6;
    const minUsernameLength = 3;
    const minNameLength = 1;

    const isPasswordValid = this.password && this.password.length >= minPasswordLength;
    const isUsernameValid = this.username && this.username.length >= minUsernameLength;
    const isNameValid = this.name && this.name.length >= minNameLength;

    return (isPasswordValid && isUsernameValid && isNameValid);
  }

  public checkPassword(password: string): boolean {
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

  public canManageLocks() : boolean {
    return this.permissions.canManageLocks;
  }

  public canManageEletricDevices() : boolean {
    return this.permissions.canManageEletricDevices;
  }

  public setManageLocksPermission(canManage: boolean): void {
    if (this.isAdmin() === false) {
      this.permissions.canManageLocks = canManage;
    }
  }

  public setManageEletricDevicesPermission(canManage: boolean): void {
    if (this.isAdmin() === false) {
      this.permissions.canManageEletricDevices = canManage;
    }
  }

  public isFromHouse(houseId: string) {
    return this.houseId === houseId;
  }
}

export default User;