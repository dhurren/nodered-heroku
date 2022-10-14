
/* ok but websockets don't work
var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

app.use('/', proxy('http://localhost:'+port1+'/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )
*/


var { createProxyMiddleware } = require('http-proxy-middleware');  
var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

//const wsProxy = createProxyMiddleware( {
//    target: 'ws://localhost/editor/comms', ws: true, changeOrigin: true
//});

const wsProxy = createProxyMiddleware({ pathFilter: '/editor/comms', target: 'http://localhost', ws: true });

app.use( wsProxy );
app.use( '/', proxy('http://localhost:'+port1+'/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )


