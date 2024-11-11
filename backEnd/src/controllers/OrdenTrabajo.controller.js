import {pool} from '../../config/database.js';

export const getOT = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM ot')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createOT = async (req, res) => {
    console.log('Datos recibidos en req.body:', req.body);
    const { edificio, sector, piso, tipoActivo, ubicacion, tareas, usuario, fecha} = req.body;
    
    const tareasTexto = tareas.join(', ');
    
    try {
      const [result] = await pool.query(
        'INSERT INTO ot (Edificio, Piso, Ubicacion, Sector, Tipo_Activo, Tareas, usuarios, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [edificio, piso, ubicacion, sector, tipoActivo, tareasTexto, usuario, fecha] 
      );
      res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
  };


/*export const createOT =async (req,res)=>{
    try {
        const[result] = await pool.query('INSERT INTO OT (//DATOS DE CODIGO//) VALUES(?,?,?)', [OT])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}*/

export const deleteOT = async (req, res) => {
    console.log('Datos recibidos en delete:', req.params);
    const { id } = req.params; 
    try {
        const [result] = await pool.query('DELETE FROM ot WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'OT no encontrado' });
        }
        res.status(204).send(); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}
export const updateEstadoOT = async (req, res) => {
console.log("funciona el updateestado")
const { id } = req.params;
const { estado } = req.body;  // El nuevo valor del estado

  try {
    const [result] = await pool.query('UPDATE ot SET disponible = ? WHERE id = ?', [estado, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'OT no encontrada' });
    }

    res.json({ message: 'Estado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el estado', error: err.message });
  }
};

/*export const updateOT = async (req, res) => {
    const { id } = req.params; // Obtener el `id` de la OT desde los parámetros de la URL
    const { estado } = req.body; // Obtener el nuevo `estado` desde el cuerpo de la solicitud

    if (typeof estado !== 'boolean') {
        return res.status(400).json({ message: 'El estado debe ser un valor booleano (true/false)' });
    }

    try {
        // Ejecutar la consulta SQL para actualizar el estado de la OT
        const [result] = await pool.query('UPDATE OT SET estado = ? WHERE id = ?', [estado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'OT no encontrada' });
        }

        // Responder con el nuevo estado actualizado
        res.json({ message: 'Estado de la OT actualizado correctamente', id, estado });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servicio interno', error: err.message });
    }
};*/