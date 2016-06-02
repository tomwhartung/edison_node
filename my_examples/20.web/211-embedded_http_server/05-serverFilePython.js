/**
 * Web server inpsired by Node.js for Embedded Systems by Patrick Mulder
 * This version serves an Python file ... or at least tries to.
 */
var http = require( 'http' );
// var fs = require( 'fs' );
// var helloPythonPage = fs.readFileSync('helloPython.py');
var sys = require( 'sys' );
// var exec = require( 'child_process' ).exec;
var execFile = require( 'child_process' ).execFile;

/**
 * This is not working, probably due to the version of node on the Edison being fairly old (v0.10.38).
 * Moreover I am just experimenting and really have no real need to get this to work right now.
 *
 * This is the output I am seeing:
 *   $ node 05-serverFilePython.js
 *   starting server at port: 3000
 *   error: undefined
 *   stdout: undefined
 *   stderr: undefined
 *
 * References:
 *   http://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js
 * The article above refers to documentation for version v6.2.0 of node:
 *   https://nodejs.org/api/child_process.html
 */
function helloPythonStdout( error, stdout, stderr ) {
// sys.puts(stdout)
   console.log( 'error: ' + error );
   console.log( 'stdout: ' + stdout );
   console.log( 'stderr: ' + stderr );
   return 'Can I return stdout from this function?';
// return stdout;
}
var args = [];
var options = '';
execFile( "helloPython.py", args, options, helloPythonStdout );

var server = http.createServer( function (req, res) {
   var helloPythonMarkup = helloPythonStdout();
// var helloPythonMarkup = 'helloPythonStdout';
	res.writeHead( 200, {'Content-type': 'text/html'} );
	res.write( helloPythonMarkup );
	res.end();
});
//
// start server at a port
//
var port = 3000;
server.listen( port );
console.log( 'starting server at port: ' + port );
