const express = require('express');
const pool = require('../Database');
const rutas = express.Router();
const Educado = require('../Educados');


rutas.get('/educado/list',async(req, res) => {
    let consulta=await pool.query('select * from Educado WHERE VALIDO=1');
    res.render('educados/list',{consulta});
});

rutas.get('/educado/add',(req, res) => { 
    res.render('educados/add');
});

rutas.post('/educado/add',async (req, res) => {
    const Chico=req.body;
    var id = await pool.query('SELECT COUNT(id) as cantidad FROM Educado;');
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
        valido:1,
    };
    console.log(aux);
    if(aux.nombre!='' && aux.CI!='') await pool.query('insert into Educado set ?',aux);

    let consulta=await pool.query('select * from Educado WHERE VALIDO=1');
    res.render('educados/list',{consulta});
});

rutas.get('/educado/edit/:id',async(req, res) => {
    let id=req.params;
    const editar= await pool.query('select * From Educado where ?',id);
    editar[0].Fnac=editar[0].Fnac.getFullYear() + "-"+ ("0" +(editar[0].Fnac.getMonth()+1)).slice(0-2) +"-" + ("0"+editar[0].Fnac.getDate()).slice(0-2);
    res.render('educados/edit',{editar :editar[0]});
        console.log(editar[0]);
});

rutas.post('/educado/edit/:id',async(req, res) => { 
    let id=req.params.id;    
    let cuerpo=req.body;
    const aux={
       // id:id,
        nombre:cuerpo.Nombre,
        CI: cuerpo.Ci,
        sipi: cuerpo.Sipi,
        fnac: cuerpo.Fnac,
        prorroga: cuerpo.Prorroga,
        pei: cuerpo.PEI,
        rutafoto: cuerpo.Rutafoto,
        valido:1,
    };

    await pool.query('update Educado set ? where id= ?',[aux, id]);

    let consulta=await pool.query('select * from Educado WHERE VALIDO=1');
    res.render('educados/list',{consulta});
});


rutas.get('/educado/delete/:id', async(req, res) =>{
    var id= req.params.id;
    pool.query('update Educado set VALIDO=0 where id= ?',id);
    let consulta=await pool.query('select * from Educado where valido=1');
    res.render('educados/list',{consulta});
});

rutas.get('/educado/menu/:id',async(req, res) => {
    let id=req.params;
    console.log(id);
    res.render('educados/menu',id);
});

rutas.get('/educado/pei/:id',async(req, res) => {
    let id=req.params;
    console.log(id);
    res.render('educados/PEI',id);
});

rutas.get('/educado/ei/:id',async(req, res) => {
    let id=req.params;
    console.log(id);
    res.render('educados/EI',id);
});

rutas.post('/educado/PEI',async(req, res) => {
    let id=req.params;
    console.log(id);
    let consulta=await pool.query('select * from Educado where valido=1');
    res.render('educados/list',{consulta});
});

rutas.post('/educado/ei',async(req, res) => {
    let id=req.params;
    console.log(id);
    let consulta=await pool.query('select * from Educado where valido=1');
    res.render('educados/list',{consulta});
});


module.exports = rutas;