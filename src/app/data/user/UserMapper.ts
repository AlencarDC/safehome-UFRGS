import User from '../../models/User';

class UserMapper {
  public static toDomain(raw: any): User {
    if (!raw) {
      return null;
    }

    return new User(raw.name, raw.username, raw.password, raw.admin, raw.houseId, raw.manageLocks, raw.manageDevices, raw.id);
  }

  public static toPersistence(user: User): any {
    return {
      name: user.getName(),
      username: user.getUsername(),
      password: user.getPassword(),
      admin: user.isAdmin(),
      houseId: user.getHouse(),
      manageLocks: user.canManageLocks(),
      manageDevices: user.canManageEletricDevices()
    }
  }
}

export default UserMapper;