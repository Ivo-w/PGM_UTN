import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {pool} from '../config/database.js';

 import userRoutes from './routes/usuario.rutas.js';
 import cuiaRoutes from './routes/CUIA.rutas.js';
 import edificioRoutes from './routes/edificio.rutas.js';
 import pisoRoutes from './routes/piso.rutas.js';
 import activoRoutes from './routes/activotarea.rutas.js'; //activo solo
 import ubicacionRoutes from './routes/ubicacion.rutas.js';
 const authRoutes = require('./routes/auth');
 //import sectorRoutes from './routes/piso.rutas.js';


const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.DB_USER);  // Debe imprimir 'root'
console.log(process.env.DB_PASSWORD);  // Debe imprimir 'cararmingol'

app.use(cors({
    origin:'http://localhost:4200',credentials:true
}));

//aplicar el import
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',cuiaRoutes);
app.use('/api',edificioRoutes );
app.use('/api', pisoRoutes);
app.use ('/api', activoRoutes);
app.use ('/api', ubicacionRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api', sectorRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
