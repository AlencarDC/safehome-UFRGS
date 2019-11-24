import Sequelize, { Model, DataTypes } from 'sequelize';

class Lock extends Model {
  public id!: number;
  public name!: string;
  public status!: boolean;
  public houseId!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;


  public static initialize(sequelize: Sequelize.Sequelize): any {
    super.init.call(this, {
      name: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    });

    return this;
  }

  public static associate(models: any) : void {
    this.belongsTo(models.House, { targetKey: 'id', foreignKey: 'houseId'});
  }
}

export default Lock;
