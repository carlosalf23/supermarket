import DataTypes from 'sequelize'; // Extensión para utilizar funciones
import { sequelize } from '../config/db.js';
import Producto from '../models/productosModel.js';

// Caja Principal para todos los controladores del producto
export const productoController = {

    // Función para crear un nuevo producto 
    create: async (req, res) => {
        try {
            const { nombre, descripcion, precio, stock } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es obligatorio.' });
            }

            const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock });
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },

    // Función para devolver todos los productos
    getAllProducts: async (req, res) => {
        try {
            const productos = await Producto.findAll({ where: { fecha_eliminacion: null } });
            return res.status(200).json(productos);
        } catch (error) {
            console.error('Error al obtener los Productos:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
    // Función para devolver un producto por el ID (Identificador)
    getProductsById: async (req, res) => {
        try {
            const { id } = req.params;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado.' });
            }

            return res.status(200).json(producto);
        } catch (error) {
            console.error('Error al obtener Producto por ID:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    // Función para actualizar datos de producto existente
    updateProduct: async (req, res) => {

        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        try {
            const productoActual = await Producto.findByPk(id);
            if (!productoActual) {
                return res.status(404).json({ message: 'producto no encontrado' });
            }

            await productoActual.update({ nombre, descripcion, precio, stock });

            return res.status(200).json({ message: 'Producto actualizado', data: productoActual });
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar', error: error.message });
        }
    },

    // Controlador para eliminar directamente un producto a través de su ID
    deleteProduct: async (req, res) => {

        const { id } = req.params; // Por parametros seran enviados por el ID de URL. 

        try {
            const productoBorrar = await Producto.findByPk(id);

            if (!productoBorrar) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Asignar manualmente la fecha actual  (eliminación logica)
            await productoBorrar.update({ fecha_eliminacion: new Date() });

            // Ejecutar soft delete  (lo elimina por completo, traduccion te equivocas y pailas)
            //await productoBorrar.destroy();

            return res.status(200).json({ message: 'Producto eliminado lógicamente con fecha actual' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar', error: error.message });
        }
    },

};



