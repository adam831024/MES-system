// module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const fs = require("fs");
// const mysql = require('mysql');
const mqtt = require('mqtt');

var port = 8000; //server porrt
//UI administrator
app.get('/', function (req, res) {
  res.sendFile('UI.html', {root: __dirname});
});

app.listen(port, function () {
  console.log('Server is listening on port: ',port);
});