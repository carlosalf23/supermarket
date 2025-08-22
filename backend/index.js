import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import './models/index.js';
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 
// Rutas
app.use("/api/productos", productRoutes); 



//console.log(PORT);

// Verificar conexión a la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    
    // Verificación de conexión a la base de datos
    await sequelize.authenticate(); 
    // En esta parte se está creando el esquema "inventario" si no existe
    await sequelize.createSchema("inventario",{ ifNotExists: true })
    
    //Elimina y recrea todas las tablas. Destructivo. { force: true }	 
    //Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: false });

    // Si la conexión es exitosa, iniciar el servidor
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}  `);
    });
    } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    process.exit(1); // Detener el proceso si la conexión falla
  }
};

startServer();
