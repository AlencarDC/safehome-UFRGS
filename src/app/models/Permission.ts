class Permission {
  public canManageLocks: boolean;
  public canManageEletricDevices: boolean;

  public constructor(canManageLocks: boolean, canManageEletricDevices: boolean) {
    this.canManageLocks = canManageLocks;
    this.canManageEletricDevices = canManageEletricDevices;
  }
}

export default Permission;