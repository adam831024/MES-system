// module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const fs = require("fs");
const mysql = require('mysql');
const mqtt = require('mqtt');

var port = 8000; //server porrt
var current_date = new Date(Date.now() + 8 * 3600 * 1000);

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
      // console.log(result[0].ingredient_A-A, result[0].ingredient_B-B, result[0].ingredient_C-C);

      var up_sql = `UPDATE material SET ingredient_A = '${result[0].ingredient_A - A}', ingredient_B = '${result[0].ingredient_B - B}', ingredient_C = '${result[0].ingredient_C - C}'`;
      con.query(up_sql, function(error, result){
        console.log("material update complete");
      })
    })
  });
});

app.listen(port, function () {
  console.log('Server is listening on port: ',port);
});