
var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

// CORS
app.use(cors())

var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : 'Studium2018;',  
  database : 'proyecto_fenix'  
});



app.get('/json', function (req, res) {
  connection.connect();  
 
  connection.query('SELECT * from zonas', function(err, rows, fields)   
  {  
      connection.end();
 
      if (err) throw err;  
      //console.log(rows[0].coordenadaXZona);
      let coordenadas = [];
      for(var i = 0; i<rows.length; i++)
      {
        coordenadas[i] = rows[i].coordenadaXZona+","+rows[i].coordenadaYZona;
      }
      res.json(coordenadas[0]);
  });
});

app.listen(3000, function () {
  console.log('Puerto 3000!');
});