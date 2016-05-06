//
// From the book "Node.js for Embedded Systems" by Patrick Mulder
//
var firmata = require( 'firmata' );

// Main part
var board = new firmata.Board( modem, function(err) {
   console.log( 'connected: ' + modem);
   var ledOn = true;
	//
});
