const express = require('express');
const rutas = express.Router();
const Educado = require('../Educados');


rutas.get('/home',(req, res) => {
    res.render('home');
});

module.exports = rutas;