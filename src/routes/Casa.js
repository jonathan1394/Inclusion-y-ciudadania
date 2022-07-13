const express = require('express');
const pool = require('../Database');
const rutas = express.Router();
const Educado = require('../Educados');

rutas.get('/casa/add',(req,res)=>{
    res.render('Casa/add');
});

rutas.post('/casa/add',async(req,res)=>{
    const casa = req.body;
    var id_ = await pool.query('SELECT COUNT(id) as cantidad FROM casa;');
    id_=JSON.parse(JSON.stringify(id_[0]));
    const aux={
        id:((id_.cantidad)+1),
        nombre: casa.nombre,
        direccion:casa.direccion,
        telefono:casa.telefono,
        foto:casa.foto,
        valido:1,
    }
    await pool.query('insert into casa set ?',aux);
    let consulta=await pool.query('select * from casa WHERE valido=1');
    res.render('casa/list',{consulta});

      
});

    
rutas.get('/casa/list', async(req,res)=>{
    let consulta=await pool.query('select * from casa WHERE valido=1');
    res.render('casa/list',{consulta});
});


rutas.get('/casa/edit/:id',async (req,res)=>{
    let id=req.params;
    id=id.id;
    let consulta=await pool.query('select * from casa where ?',{id});
    console.log(consulta);
    res.render('casa/edit', {consulta:consulta[0]});
});

rutas.post('/casa/edit/:id',async (req,res)=>{
    let casa=req.body;
    let id=req.params.id;
    console.log(casa);
    const aux={
        nombre:casa.nombre,
        direccion:casa.direccion,
        telefono: casa.telefono,
        foto:casa.foto,
    };
    await pool.query('update casa set ? where id= ?',[aux, id]);    
    let consulta=await pool.query('select * from casa WHERE valido=1');
    res.render('casa/list',{consulta});
});

rutas.get('/casa/delete/:id', async(req,res)=>{
    let id=req.params;
    await pool.query('update casa set valido=0 where ?',id);
    let consulta=await pool.query('select * from casa WHERE valido=1');
    res.render('casa/list',{consulta});

});
module.exports = rutas;