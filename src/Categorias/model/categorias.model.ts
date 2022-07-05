import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'categorias',
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      subtitulo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
