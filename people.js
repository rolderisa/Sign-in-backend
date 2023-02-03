const express=require('express');
var app=express();
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');

app.use(bodyParser.urlencoded({extended: true}))

var mysqlConnection = mysql.createPool({
    host : "localhost",
    user :"root",
    password : '',
    database: 'login',
    connectionLimit:10
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/signin.html'));
});
app.post('/login', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    mysqlConnection.getConnection((err) => {

        
      if (err) {
        res.send('There is an error connecting to the database.');
      } else {
        console.log('Data connected');
  
        let query = `SELECT * FROM people WHERE email = ?`;
        mysqlConnection.query(query,email, (err, results) => {
          if (err) throw err;

          let dataFromDb = results[0];

          //console.log(dataFromDb);


            if (dataFromDb.name == name && dataFromDb.EMAIL == email && dataFromDb.password == password) {
    
  res.sendFile(__dirname + '/public/profilt.html');

            } else {
                res.send("Invalid Credentials");
            }
          })
        //   mysqlConnection.release();
        } 
      })
    });
  

// });
app.listen(3000);
console.log('listening on the port 3000')
