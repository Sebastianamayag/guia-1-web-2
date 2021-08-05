const mysql=require('mysql')
const express=require('express');
const { response } = require('express');
const app=express();
const conexion=mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
})

conexion.connect((error)=>{
    if(error) throw error
    console.log('Conexión Exitosa!')
})


app.get('/',function(req,res){
    conexion.query('SELECT * FROM users',function(error,rows){
        if(!!error){
            console.log('Conexión Fallida!')
        }else{
            console.log('Consulta de la información de la tabla')
            console.log(rows)
            res.json(rows)
            conexion.end();
        }
    })


})



app.listen(3000)