// Conexion a la Base de datos

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configuracion de Sequelize
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: "postgres",
        logging: false,// Activa el logging si necesitas ver las consultas SQL
    }
);
