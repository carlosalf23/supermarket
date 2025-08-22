import {DataTypes} from 'sequelize';
import { sequelize } from '../config/db.js';

const Productos=sequelize.define('productos',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true      
    },
    descripcion:{
        type: DataTypes.TEXT
    },
    precio:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    fecha_eliminacion:{
        type: DataTypes.DATE
    }

},{
      schema: 'inventario',     // <-- aquí indica el schema

});

export default Productos;