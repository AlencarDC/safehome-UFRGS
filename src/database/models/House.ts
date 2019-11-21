import Sequelize, { Model, DataTypes } from 'sequelize';

class House extends Model {
  public id!: number;
  public camerasStatus!: boolean;
  public alarmStatus!: boolean;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;


  public static initialize(sequelize: Sequelize.Sequelize): any {
    super.init.call(this, {
      camerasStatus: DataTypes.BOOLEAN,
      alarmStatus: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
    },
    {
      sequelize,
    });

    return this;
  }

  public static associate(models: any) : void {
    this.hasMany(models.User, { sourceKey: 'id', foreignKey: 'houseId'});
  }
}

export default House;
