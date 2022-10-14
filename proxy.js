
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

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

var app = express();
var proxy = httpProxy.createProxyServer({ target: 'http://localhost:'+port1+'/', ws: true });
var server = require('http').createServer(app);

// proxy HTTP GET / POST
app.get('/*', function(req, res) {
  proxy.web(req, res, {});
});
app.post('/*', function(req, res) {
  proxy.web(req, res, {});
});

// Proxy websockets
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});


server.listen( process.env.PORT );
