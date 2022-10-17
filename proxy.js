
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

var redport = (parseInt(process.env.PORT) + 1) 
console.log( "node red port=" + redport ) 

//const wsProxy = createProxyMiddleware( {
//    target: 'ws://localhost/editor/comms', ws: true, changeOrigin: true
//});

const wsProxy = createProxyMiddleware({ target: 'http://localhost:'+redport+'/', ws: true, 
    router: { '/editor1': 'http://localhost:'+redport, 
              '/editor2': 'http://localhost:'+(redport+1), 
              '/editor3': 'http://localhost:'+(redport+2),
              '/editor4': 'http://localhost:'+(redport+3),
              '/editor': 'http://localhost:'+redport
            } });

app.use( '/', wsProxy );
//app.use( '/', proxy('http://localhost:'+redport+'/')); 
app.listen( process.env.PORT, function () { console.log("Proxy listening") } )


