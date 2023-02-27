import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare readonly id: number;
  declare email: string;
  declare username: string;
  declare password: string;
  declare role: string;
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
  tableName: 'users',
});

export default User;
