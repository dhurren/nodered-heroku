
/* ok but websockets don't work
var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

app.use('/', proxy('http://localhost:'+port1+'/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )
*/

var http = require('http'),
    httpProxy = require('http-proxy'),
    express = require('express');

var proxy = new httpProxy.createProxyServer({
  target: "https://enjine.cloud"
});

var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});
 
proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});
 
proxyServer.listen( process.env.PORT );
