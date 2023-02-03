const mysql =require('mysql');
const express=require('express');
const bodyParser=require("body-parser");
var app=express();
app.use(express.static('public'));
var url=require('url');


const path=require('path');
app.use(bodyParser.urlencoded({extended: true}))

var mysqlConnection = mysql.createPool({
    host : "localhost",
    user :"root",
    password : '',
    database: 'login',
    connectionLimit:10
});
// mysqlConnection.connect((err)=>{
//     if(err){
//         console.log("not connected");
//     }else{
//         console.log('connected');
//     }

//});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});
app.post('/login',(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password

    mysqlConnection.getConnection((err,con)=>{
        if(err){
           res.send(' there is an error connecting to databases')
        }else{
        console.log('data connected');
        }
        let query =`INSERT INTO people (name,email,password) values (?,?,?)`; 
        con.query(query, [name,email,password],(err)=>{
            if(err){
                res.send('Data not send')
            }else{
                res.send('sign up successful')
           
            }
            
        })
    })
})


app.listen(5000);
console.log("server is running at port 5000");