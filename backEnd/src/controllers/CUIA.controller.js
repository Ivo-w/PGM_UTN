import {pool} from '../../config/database.js';

export const getCUIA = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM cuia');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createCUIA =async (req,res)=>{
   //datos de codigo unico identificacion de activo
    try {
        const[result] = await pool.query('INSERT INTO cuia (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}
//posiblemente no se use por que no se borran datos si no que updateCUIA cambia estado de activo 
export const deleteCUIA= async(req,res)=>{
    const {CUIA} = req.params
    try {
        const [result] = await pool.query('DELETE FROM cuia WHERE cuia = ?', [CUIA])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'CUIA no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateCUIA = async (req,res)=>{
    const {CUIA} = req.params
    
    try {
        const [result] =await pool.query('UPDATE cuia SET funciona? = ? ', [CUIA])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'CUIA no encontrado'})
        }
        res.json({CUIA})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}