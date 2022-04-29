const db=require('./Database');


function Educados(pId,pNombre){
    this.Id=pId;
    this.Nombre=pNombre;
};

function getNombre(){
    return this.Nombre;
};

function getId(){
    return this.Id;
};

function updateNombre(pNombre){
    this.Nombre=pNombre;
}


module.exports = Educados;