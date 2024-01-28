import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'; 

interface UserAttributes {
    id: number;
    username: string;
    phone: string;
    orderlist: any[];
    shoplist: any[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderlist: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
    },
    shoplist: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false,
    },
  },
  {
    tableName: 'users',
  }
);

export default User;
