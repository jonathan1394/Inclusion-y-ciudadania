const express = require('express');
const rutas = express.Router();

rutas.get('/Educado',(req, res) => {
    res.render('Educado.hbs');
});




module.exports = rutas;