const mysql=require('mysql')
const express=require('express');
const app=express();
app.use(express.json());
const conexion=mysql.createConnection({
    host:'remotemysql.com',
    user:'vvU6Km6Xaf',
    password:'3qOwmBXtC1',
    database:'vvU6Km6Xaf'
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
app.post('/user/create',async(req,res)=>{
    const {firstName,lastName,document,address,phone,email}=req.body;
    const query='SELECT * FROM users where email=?';
    await conexion.query(query,email,async(err,rows,fields)=>{
        if(rows[0]){
            res.json({
                Status:400,
                error:'El usuario ya ha sido creado'
            });
            return;
        }else{
            const query_2=`
                INSERT INTO users (firstName,lastName,document,address,phone,email)values(?,?,?,?,?,?)
            `;
            await conexion.query(query_2,[firstName,lastName,document,address,phone,email],(err,rows,fields)=>{
                if(!err){
                    res.json({
                        Status:200,
                        res:"Usuario Creado Correctamente"
                    });
                }else{
                res.json({
                        Status:400,
                        res:err
                    });
                }
            });
        }
    });
});
app.put('/user/update',async(req,res)=>{
    const {firstName,lastName,document,address,phone,email}=req.body;
    const query='SELECT * FROM users where email=?';
    await conexion.query(query,email,async(err,rows,fields)=>{
        if(rows[0]){
            res.json({
                Status:400,
                error:'El usuario no esta creado'
            });
            return;
        }else{
            const query_2=`
                UPDATE users set firstName =?, lastName =?, document =?, address =?, phone =? WHERE email = ?
            `;
            await conexion.query(query_2,[firstName,lastName,document,address,phone,email],(err,rows,fields)=>{
                if(!err){
                    res.json({
                        Status:200,
                        res:"Usuario Actualizado Correctamente"
                    });
                }else{
                res.json({
                        Status:400,
                        res:err
                    });
                }
            });
        }
    });
});


app.listen(3000)