import { Sequelize } from "sequelize";

const sequelize = new Sequelize("userdata", "rictu", "rictu", {
  host: "172.20.80.213",
  dialect: "mysql",
});

export { sequelize };
