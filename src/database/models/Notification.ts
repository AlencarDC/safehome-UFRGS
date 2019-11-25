import Sequelize, { Model, DataTypes } from 'sequelize';

class Notification extends Model {
  public id!: number;
  public type!: number;
  public title!: string;
  public message!: string;yar
  public falseAlert!: boolean;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;


  public static initialize(sequelize: Sequelize.Sequelize): any {
    super.init.call(this, {
      type: DataTypes.INTEGER,
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      falseAlert: DataTypes.BOOLEAN
    },
    {
      sequelize,
    });

    return this;
  }

  public static associate(models: any) : void {
    this.belongsToMany(models.User, { 
      through: models.UserNotification,
      as: 'users',
      foreignKey: 'notificationId',
      otherKey: 'userId'
    });
  }
}

export default Notification;
