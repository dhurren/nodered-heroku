
var { createProxyMiddleware } = require('http-proxy-middleware');  
var proxy = require('express-http-proxy');   
var app = require('express')();  

var redport = (parseInt(process.env.PORT) + 1) 
console.log( "node red port=" + redport ) 

var instances = parseInt( process.env.INSTANCES ? process.env.INSTANCES : 1 )
console.log( "instances = " + instances ) 
var instance = 0

const wsProxy = createProxyMiddleware({ 
    target: 'http://localhost:'+redport+'/', ws: true, changeOrigin: true, 
    pathRewrite: { 
        '^/instance1':'', '^/instance2':'', '^/instance3':'',
        '^/editor$':'/editor1', '^/editor/':'/editor1/'
    }, 
    router: function(req) {
        
        var i = 0
        if( req.url.startsWith("/favicon.ico") ) i = 0
        else if( req.url.startsWith("/editor1") ) i = 0
        else if( req.url.startsWith("/editor2") ) i = 1
        else if( req.url.startsWith("/editor3") ) i = 2
        else if( req.url.startsWith("/editor") ) i = 0
        else if( req.url.startsWith("/ui") ) i = 0
        else if( req.url.startsWith("/instance1") ) i = 0
        else if( req.url.startsWith("/instance2") ) i = 1
        else if( req.url.startsWith("/instance3") ) i = 2
        else { 
            //Round robin.
            if( instance++==(instances-1) ) instance = 0; 
            i = instance 
        }

        return 'http://localhost:'+(redport+i)
    }
  });

app.use( '/', wsProxy );
app.listen( process.env.PORT, function () { console.log("Proxy listening") } )
