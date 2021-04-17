// module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const fs = require("fs");
const mysql = require('mysql');
const mqtt = require('mqtt');

var port = 8000; //server porrt

//Database MySQL
var con = mysql.createConnection({ host: 'localhost', user: 'adam', password: 'good1234', database: 'mes_database' });
con.connect(function(error){
  if(error) throw error;
  console.log("success connect database");
});

//UI administrator
app.get('/', function (req, res) {
  res.sendFile('UI.html', {root: __dirname});
});

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/project', function (req, res) {
  console.log(req.body.parameter);
});

app.listen(port, function () {
  console.log('Server is listening on port: ',port);
});