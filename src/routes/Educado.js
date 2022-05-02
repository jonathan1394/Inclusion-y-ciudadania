const express = require('express');
const pool = require('../Database');
const rutas = express.Router();
const Educado = require('../Educados');



rutas.get('/Educado/list',async(req, res) => {
    let consulta=await pool.query('select * from Educados');
    res.render('Educados/list',{consulta});
});

rutas.get('/Educado/add',async(req, res) => { 
    res.render('Educados/add');
});

rutas.post('/Educado/add',async (req, res) => {
    const Chico=req.body;
    var id = await pool.query('SELECT COUNT(id) as cantidad FROM Educados;');
    id=JSON.parse(JSON.stringify(id[0]));
    const aux={
        id:((id.cantidad)+1),
        nombre:Chico.Nombre,
        CI: Chico.Ci,
        sipi: Chico.Sipi,
        fnac: Chico.Fnac,   
        prorroga: Chico.prorroga,
        pei: Chico.pei,
        rutafoto: Chico.Archivo,
    };

    if(aux.nombre!='' && aux.CI!='') await pool.query('insert into Educados set ?',aux);
    let consulta=await pool.query('select * from Educados');
    res.render('Educados/list',{consulta});
});

rutas.get('/Educado/edit:id',async(req, res) => {
    let id=req.params;
    const editar= await pool.query('select * From Educados where ?',id);
    editar[0].fnac=editar[0].fnac.getFullYear() + "-"+ ("0" +(editar[0].fnac.getMonth()+1)).slice(0-2) +"-" + ("0"+editar[0].fnac.getDate()).slice(0-2);
    res.render('Educados/edit',{editar :editar[0]});
});

rutas.post('/Educado/edit/:id',async(req, res) => { 
    let id=req.params;    
    id=(id.id *1);
    let cuerpo=req.body;
    const aux={
       // id:id,
        nombre:cuerpo.Nombre,
        CI: cuerpo.Ci,
        sipi: cuerpo.Sipi,
        fnac: cuerpo.Fnac,
        prorroga: cuerpo.prorroga,
        pei: cuerpo.pei,
        rutafoto: cuerpo.Archivo,
        
    };


    console.log(aux);
    await pool.query('update Educados set ? where id= ?',[aux, id]);

    let consulta=await pool.query('select * from Educados');
    res.render('Educados/list',{consulta});
});


rutas.get('/Educado/delete/:id', async(req, res) =>{
    var id= req.params;
    //.iddnsole.log(id.id);//.idd   
    pool.query('delete from Educados where id= ?',id.id);
        let consulta=await pool.query('select * from Educados');
    res.render('Educados/list',{consulta});
});

module.exports = rutas;