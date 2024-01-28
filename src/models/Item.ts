import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

const globalOffPercentage = process.env.OFF_PERCENTAGE ? parseInt(process.env.OFF_PERCENTAGE, 10) : 0;

interface ItemAttributes {
  id: number;
  name: string;
  price: number;
  image: string;
  has_off: boolean;
  off_percentage_value: number;
  count: number;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

interface ItemInstance extends Model<ItemAttributes, ItemCreationAttributes>, ItemAttributes {}


const Item = sequelize.define<ItemInstance>(
  'Item',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    has_off: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    off_percentage_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: globalOffPercentage,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'items',
  }
);

export default Item;
