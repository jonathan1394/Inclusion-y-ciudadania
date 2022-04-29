const mysql = require('mysql');

const {database} = require('./Keys');
const {promisify}=require('util');

const pool = mysql.createPool(database);



pool.getConnection((err,connection)=>{
    if(err){ 
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('Se cerro');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('Muchas conecciones');
        }
        if(err.code==='ECONNREFUSED'){
            console.error('REFUSED');
        }

    console.log(err);
    }
    if(connection){
    connection.release();
        console.log('base de datos conectada');  
    }                      
    return;

});

pool.query = promisify(pool.query);

module.exports = pool;