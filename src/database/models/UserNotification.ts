import Sequelize, { Model, DataTypes } from 'sequelize';

class UserNotification extends Model {
  public id!: number;
  public notificationId!: string;
  public userId!: string;
  public read!: boolean;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;


  public static initialize(sequelize: Sequelize.Sequelize): any {
    super.init.call(this, {
      notificationId: DataTypes.STRING,
      userId: DataTypes.STRING,
      read: DataTypes.BOOLEAN
    },
    {
      sequelize,
    });

    return this;
  }

  public static associate(models: any) : void {}
}

export default UserNotification;
