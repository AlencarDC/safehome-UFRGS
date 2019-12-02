import User from '../../domain/User';

class UserMapper {
  public static toDomain(raw: any): User {
    if (!raw) {
      return null;
    }

    const user = new User(raw.name, raw.username, raw.password, raw.admin, raw.houseId, raw.manageLocks, raw.manageDevices, raw.id);
    if (!!raw.token) {
      user.setToken(raw.token);
    }
    return user;
  }

  public static toPersistence(user: User): any {
    return {
      name: user.getName(),
      username: user.getUsername(),
      password: user.getPassword(),
      admin: user.isAdmin(),
      houseId: user.getHouse(),
      manageLocks: user.canManageLocks(),
      manageDevices: user.canManageEletricDevices(),
      token: user.getToken(),
    }
  }
}

export default UserMapper;