import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define(
    "productos",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
