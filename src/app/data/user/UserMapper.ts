import User from '../../models/User';

class UserMapper {
  public static toDomain(raw: any): User {
    if (!raw) {
      return null;
    }
    
    return new User(raw.name, raw.username, raw.password, raw.admin, raw.house_id, raw.id);
  }

  public static toPersistence(user: User): any {
    return {
      name: user.getName(),
      username: user.getUsername(),
      password: user.getPassword(),
      admin: user.isAdmin(),
      house_id: user.getHouse()
    }
  }
}

export default UserMapper;