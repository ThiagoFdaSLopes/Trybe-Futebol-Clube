import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare awayTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matche',
  timestamps: false,
  tableName: 'matches',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matche;
