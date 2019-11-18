import Sequelize, { Model, DataTypes } from 'sequelize';

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public admin!: boolean;
  public houseId!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;


  public static initialize(sequelize: Sequelize.Sequelize): any {
    super.init.call(this, {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    });

    return this;
  }

  public static associate(models: any) : void {
    this.belongsTo(models.House, { foreignKey: "house_id"});
  }
}

export default User;
