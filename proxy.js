
/* ok but websockets don't work
var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

app.use('/', proxy('http://localhost:'+port1+'/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )
*/


var http = require('http'),
    httpProxy = require('http-proxy');
 

var proxy = httpProxy.createProxyServer({});
 
var server = http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://enjine.cloud' });
});
 
console.log("listening on port: " + process.env.PORT)
server.listen( process.env.PORT );
