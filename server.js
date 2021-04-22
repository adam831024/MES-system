// module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const fs = require("fs");
const mysql = require('mysql');
const mqtt = require('mqtt');
const config = require("./config.js");

var n = 1; //flag

//MQTT
const client = mqtt.connect(config.mqtt_url, config.mqtt_port);
//Database MySQL
var con = mysql.createConnection({ host: config.db_host, user: config.db_user, password: config.db_password, database: config.db_database });
con.connect(function(error){
  if(error) throw error;
  console.log("success connect database");
});

//UI administrator
app.get('/', function (req, res) {
  res.sendFile('UI.html', {root: __dirname});
});
app.get('/test', function (req, res) {
  res.sendFile('test.html', { root: __dirname });
});
app.get('/login', function (req, res) {
  res.sendFile('login.html', { root: __dirname });
});

app.use(bodyParser.urlencoded({ extended: false }))

//project insert, material update
app.post('/project', function (req, res) {
  console.log(req.body.parameter);

  var current_date = new Date(Date.now() + 8 * 3600 * 1000);

  var sql = `INSERT INTO project (project, upload_time) VALUES ('${req.body.parameter}','${current_date.toISOString()}');`;

  con.query(sql, function (error, result) {
    if (error) throw error;

    console.log('success insert a project to table');
  });

  var sel_sql = `SELECT * FROM project_cost WHERE project = '${req.body.parameter}'`;
  con.query(sel_sql, function (error, result) {
    if (error) throw error;

    var A = result[0].ingredient_A;
    var B = result[0].ingredient_B;
    var C = result[0].ingredient_C;

    var sel_sql2 = "SELECT * FROM material";
    con.query(sel_sql2, function(error, result) {
      var up_sql = `UPDATE material SET ingredient_A = '${result[0].ingredient_A - A}', ingredient_B = '${result[0].ingredient_B - B}', ingredient_C = '${result[0].ingredient_C - C}'`;
      con.query(up_sql, function(error, result){
        console.log("material update complete");
      })
    })
  });
});

app.post('/login', function (req, res) {
  console.log(req.body.parameter);
  console.log(req.body.parameter2);
  var sel_sql = `SELECT * FROM login_account WHERE account = '${req.body.parameter}'`;
  res.writeHead(200, { 'Content-Type': 'application/text' });
  con.query(sel_sql, function(error, result){
    console.log(result);
    if(result.length===0){
      res.end("Wrong account");
    };
    if(result.length==true){
      if (result[0].account == req.body.parameter && result[0].password!=req.body.parameter2){
        res.end("Wrong password");
      };
      if (result[0].account == req.body.parameter && result[0].password == req.body.parameter2) {
        res.end("log in success");
      };
    };
  })
});

if(n){
  app.post('/alarm', function (req, res){
    console.log(req.body.parameter);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    n = 0;
  });
}

//MQTT
client.on('connect', function () {
  console.log("MQTT is connect");
});

client.subscribe('machine');

client.on('message', function(topic, message){
  console.log("topic", topic);
  console.log("clinet receive message:", message.toString());
});

//port
app.listen(config.server_port, function () {
  console.log('Server is listening on port: ', config.server_port);
});