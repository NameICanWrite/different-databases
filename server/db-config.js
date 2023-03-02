import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.D_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false
    }
  }
);

export default sequelize