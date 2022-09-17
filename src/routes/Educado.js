const express = require('express');
const pool = require('../Database');
const rutas = express.Router();
const Educado = require('../Educados');


rutas.get('/educado/list',async(req, res) => {
    let consulta=await pool.query('select * from Educado WHERE VALIDO=1');
    res.render('educados/list',{consulta});
});

rutas.get('/educado/add',async(req, res) => { 
    var Casas = await pool.query('select * from casa where Valido=1');
    res.render('educados/add', {Casas});
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
        casa: Chico.Casa,
        rutafoto: Chico.Archivo,
        valido:1,
    };
    if(aux.nombre!='' && aux.CI!='') await pool.query('insert into Educado set ?',aux);

    let consulta=await pool.query('select * from Educado WHERE VALIDO=1');
    res.render('educados/list',{consulta});
});

rutas.get('/educado/edit/:id',async(req, res) => {
    let id=req.params;
    const editar= await pool.query('select * From Educado where ?',id);
    var Casas =await pool.query('select * from casa where Valido=1 and Id <> ?',editar[0].Casa);
    var Seleccionada = await pool.query('select * from casa where Valido=1 and Id = ?', editar[0].Casa);
    if(editar[0].Fnac!='')
    editar[0].Fnac=editar[0].Fnac.getFullYear() + "-"+ ("0" +(editar[0].Fnac.getMonth()+1)).slice(0-2) +"-" + ("0"+editar[0].Fnac.getDate()).slice(0-2);
    res.render('educados/edit',{editar :editar[0],Casas,S:Seleccionada[0]});
});

rutas.post('/educado/edit/:id',async(req, res) => { 
    let id=req.params.id;    
    let cuerpo=req.body;
    const aux={
        Id:id,
        Nombre:cuerpo.Nombre,
        CI: cuerpo.Ci,
        sipi: cuerpo.Sipi,
        fnac: cuerpo.Fnac,
        Casa: cuerpo.Casa,
        Rutafoto: cuerpo.Rutafoto,
        Valido:1,
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
    //console.log(id);
    let aux = await pool.query('select * from Educado where id=?',id.id);
    const result = Object.values(JSON.parse(JSON.stringify(aux)));
    console.log(result);
    let adolesente ={
        Id:result[0].Id,
        Nombre : result[0].Nombre
    };
    res.render('educados/menu',{adolesente});
    console.log(adolesente);
});

rutas.get('/educado/pei/:id',async(req, res) => {
    let id=req.params;
    console.log(id);
    const educador = await pool.query('Select Id,Nombre from Educador where valido = 1')
    const area= await pool.query('select * from Area where valido=1'); 
    res.render('educados/PEI/Add-PEI',{id,area,educador});
});

rutas.get('/educado/ei/:id',async(req, res) => {
    let id=req.params;
    //console.log(id);
    res.render('educados/EI',id);
});

rutas.post('/educado/pei',async(req, res) => {
    let id=req.params;
    
    let aux = req.body;
    console.log(aux);    
    //await pool.query('insert (Fecha,Area,Objetivoymeta,Accionacuerdo,Plazo, Resultados) into ProEduIndi as PEI, ProEduIniLinea as PEIL where PEIL.Id_pro=PEI.Id;')
    let consulta=await pool.query('select * from Educado where valido=1');
    res.render('educados/list',{consulta});
});

rutas.post('/educado/ei',async(req, res) => {
    let id=req.params;
    console.log(id);
    let consulta=await pool.query('select * from Educado where valido=1');
    res.render('educados/list',{consulta});
});


rutas.get('/educado/EvaluacionPEI/:id',async(req, res) => {
    let id=req.params;  
    let consulta=await pool.query('select * from Educado where valido=1');
    //console.log(consulta);
    res.render('educados/PEI/EvaluacionPEI',{consulta});
    
});

rutas.post('/educado/EvaluacionPEI/:id',async(req, res) => {
    let id=req.params;  
    let consulta=await pool.query('Select Fecha,Area,Objetivoymeta,Accionacuerdo,Plazo, Resultados from ProEduIndi as PEI, ProEduIniLinea as PEIL where PEIL.Id_pro=PEI.Id;');
    //console.log(consulta);
    res.render('educados/PEI/EvaluacionPEI',{consulta});
    
});




module.exports = rutas;