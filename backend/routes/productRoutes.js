import express from 'express';
import { productoController } from '../controllers/productoControllers.js';
const router = express.Router();

// Llaves para llamar a controladores de Producto
router.post('/guardar',productoController.create); // Ruta para crear nuevo producto.
router.get('/todos',productoController.getAllProducts); // Ruta para consultar todos los productos.
router.get('/:id',productoController.getProductsById); // Ruta para obtener producto por ID. 
router.put('/actualizar/:id',productoController.updateProduct) // Ruta para actualizar productos por ID especifico. 
router.delete('/delete/:id',productoController.deleteProduct) // Ruta para eliminar productos por medio de su ID. 
      
export default router;

