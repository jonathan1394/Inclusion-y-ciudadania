const express = require('express');
const pool = require('../Database');
const rutas = express.Router();
const Educado = require('../Educados');

rutas.get('/educador/list',async(req, res) => {
    let consulta=await pool.query('select * from Educador where valido=1');
    res.render('educador/list',{consulta});
});


rutas.get('/educador/add',async(req, res) => { 
    res.render('educador/add');
});

rutas.post('/educador/add',async (req, res) => {
    const Chico=req.body;
    var id = await pool.query('SELECT COUNT(id) as cantidad FROM Educador where valido=1;');
    id=JSON.parse(JSON.stringify(id[0]));
    const aux={
        Id:((id.cantidad)+1),
        Nombre:Chico.Nombre,
        Telefono:Chico.telefono,
        F_nac: Chico.fnac,
        valido:1,
    };
    if(aux.nombre!='' && aux.CI!='') await pool.query('insert into Educador set ?',aux);
    let consulta=await pool.query('select * from Educador where valido = 1');
    res.render('educador/list',{consulta});
});

rutas.get('/educador/edit/:id',async(req, res) => {
    let id=req.params;
    const editar= await pool.query('select * From Educador where ? and valido=1',id);
    if(editar[0].F_Nac != null)
    editar[0].F_Nac=editar[0].F_Nac.getFullYear() + "-"+ ("0" +(editar[0].F_Nac.getMonth()+1)).slice(0-2) +"-" + ("0"+editar[0].F_Nac.getDate()).slice(0-2);
    res.render('educador/edit',{editar :editar[0]});
        console.log(editar[0]);
});

rutas.post('/educador/edit/:id',async(req, res) => { 
    let id=req.params.id;    
    let cuerpo=req.body;
    const aux={
       // id:id,
        Nombre:cuerpo.Nombre,
        Telefono: cuerpo.Telefono,
        F_Nac: cuerpo.F_Nac,
        valido:1,
    };
    await pool.query('update Educador set ? where id= ?',[aux, id]);
    let consulta=await pool.query('select * from Educador where valido = 1');
    res.render('educador/list',{consulta});
});


rutas.get('/educador/delete/:id', async(req, res) =>{
    var id= req.params.id;
    pool.query('delete * where id= ?',id);
    let consulta=await pool.query('select * from Educado where valido =1');
    res.render('educador/list',{consulta});
});


module.exports = rutas;