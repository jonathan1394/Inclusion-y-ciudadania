const express = require('express');
const rutas = express.Router();

rutas.get('/casa/add',(req,res)=>{
    res.render('casa/add');
});

rutas.post('/casa/add',async(req,res)=>{
    const casa = req.body;
    var id_ = await pool.query('SELECT COUNT(id) as cantidad FROM Educados;');
    id_=JSON.parse(JSON.stringify(id_[0]));
    const aux={
        id:id_.cantidad,
        nombre: casa.nombre,
        direccion:casa.direccion,
        telefono:casa.telefono,
        foto:casa.foto
    }
    pool.query('insert into casa set ?',aux);
    res.sender('casa/list');

});

module.exports = rutas;