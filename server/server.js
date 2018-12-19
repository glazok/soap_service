const service = require('./service');

const express = require('express');
var cors = require('cors');
const http = require('http');
const soap = require('soap');

const xml = require('fs').readFileSync('./myservice.wsdl','utf8');
const app = express();
app.use(cors());

app.use(express.static('../client'));

const server = app.listen(3030,function(){
  const host = "127.0.0.1";
  const port = server.address().port;
});
const serv = soap.listen(server,'/soap',service,xml);
