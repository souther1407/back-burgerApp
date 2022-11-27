import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define(
    "sliders",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
