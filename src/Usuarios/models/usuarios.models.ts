import { DataTypes, Sequelize } from "sequelize";
import { hashPassword } from "../../utils/hashPassword.js";
export default (sequelize: Sequelize) => {
  return sequelize.define(
    "usuarios",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clave: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value: string) {
          this.setDataValue("clave", hashPassword(value));
        },
      },
      token: {
        type: DataTypes.TEXT,
        allowNull:false, 
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
