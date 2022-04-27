const express = require('express');
const rutas = express.Router();
const Educado = require('./../Educados');


rutas.get('/Educado',(req, res) => {
    let list = [];
    for (var i=0;i<=4;i++){
        var e=new Educado(i,"Jonathan");
        list.push(e);
        //console.log(i);
    }
    console.log(list);
    res.render('Educado',{list});
});

module.exports = rutas;