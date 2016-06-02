/**
 * Web server inpsired by Node.js for Embedded Systems by Patrick Mulder
 * This version serves some very simple markup.
 * Hey, unless I tried it, I would not know how this markup might be rendered,
 *   and now I know.
 */
var http = require( 'http' );

var server = http.createServer( function (req, res) {
   var markup = getSomeMarkup();
	res.writeHead( 200, {'Content-type': 'text/html'} );
//	res.write( 'Hello web surfer!\n' );
	res.write( markup );
	res.end();
});
/**
 * Try returning some markup instead of just straight text
 */
function getSomeMarkup() {
   var markup = '';
   markup += '<body>';
   markup += '<h1>Heading level 1</h1>';
   markup += '<p>Some text in a paragraph.';
   markup += '</p>';
   markup += '</body>';
   return markup;
}
//
// start server at a port
//
var port = 3000;
server.listen( port );
console.log( 'starting server at port: ' + port );
