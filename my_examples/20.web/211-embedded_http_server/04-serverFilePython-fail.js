/**
 * Web server inpsired by Node.js for Embedded Systems by Patrick Mulder
 * This version serves an Python file ... or at least tries to.
 */
var http = require( 'http' );
var fs = require( 'fs' );
var helloPythonPage = fs.readFileSync('helloPython.py');

var server = http.createServer( function (req, res) {
	res.writeHead( 200, {'Content-type': 'text/html'} );
	res.write( helloPythonPage );
	res.end();
});
//
// start server at a port
//
var port = 3000;
server.listen( port );
console.log( 'starting server at port: ' + port );
