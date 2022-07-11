import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'variantes',
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
