const express = require('express');
const rutas = express.Router();
const Educado = require('../Educados');


rutas.get('/list',(req, res) => {
    res.render('./Educados/list');
});

module.exports = rutas;