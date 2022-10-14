
/* ok but websockets don't work
var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

app.use('/', proxy('http://localhost:'+port1+'/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )
*/


var proxy = require('express-http-proxy');   
var app = require('express')();  

var port1 = (parseInt(process.env.PORT) + 1) 
console.log( "port=" + port1 ) 

app.use('/', proxy('https://enjine.cloud/')); 
app.listen(process.env.PORT, function () { console.log("Proxy listening") } )
