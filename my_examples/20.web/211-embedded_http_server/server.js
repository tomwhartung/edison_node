/**
 * Web server inpsired by Node.js for Embedded Systems by Patrick Mulder
 *
 */
var http = require( 'http' );

var server = http.createServer( function (req, res) {
	res.writeHead( 200, {'Content-type': 'text/html'} );
	res.write( 'Hello web surfer!\n' );
	res.end();
});
//
// start server at a port
//
var port = 3000;
server.listen( port );
console.log( 'starting server at port: ' + port );
