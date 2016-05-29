//
// From the book "Node.js for Embedded Systems" by Patrick Mulder
//    Chapter 2, Blink With JavaScript - Programming the Thing
//
var firmata = require( 'firmata' );

// var modem = '/dev/cu.usbserial-DJ008CEA';
var modem = '/dev/usbmon0';

//
// Main part
//
var board = new firmata.Board( modem, function(err) {
	console.log( 'connected: ' + modem);
	var ledOn = true;
	//
	// Configure pin 13 as output
	//
	board.pinMode(13, board.MODES.OUTPUT);
	//
	// Blink the LED
	//
	setInterval(function() {
		if (ledOn) {
			console.log('ON');
			board.digitalWrite(13, board.HIGH);
		} else {
			console.log('OFF');
			board.digitalWrite(13, board.LOW);
		}
		ledOn = !ledOn;
	}, 500);
});
