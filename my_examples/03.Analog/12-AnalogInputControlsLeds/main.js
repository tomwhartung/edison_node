/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Read analog input and use it to control the length of the on-off cycles of more thnan one LED.
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 * Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.
 *
 * Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
 * Using a ssh client: 
 * 1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
 * 2. opkg update
 * 3. opkg upgrade
 * Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

var mraa = require("mraa");         // require mraa

var analogPin0 = new mraa.Aio(0);             // setup access analog input Analog pin #0 (A0)
var currentAnalogValue = analogPin0.read();   // read the value of the analog pin
var savedAnalogValue = currentAnalogValue;    // when the analog input value changes ...
var savedIntervalId = 0;                      // ... kill the currently running interval and start a new one
const maxAnalogValue = 1024;                  // maximum value returned when reading analog in

var ledPin2 = new mraa.Gpio(2);   // Initialize LED on Digital Pin #2 (D2)
var ledPin4 = new mraa.Gpio(4);   // Initialize LED on Digital Pin #2 (D2)

const LOW = 0;
const HIGH = 1;
var led2State = LOW;
var led4State = HIGH;

/**
 * Set the direction on the leds and set their initial values
 */
function setup() {
	console.log('MRAA Version: ' + mraa.getVersion());
	ledPin2.dir( mraa.DIR_OUT );        // set the gpio direction to output
	ledPin4.dir( mraa.DIR_OUT );        // set the gpio direction to output
	ledPin2.write( led2State );
	ledPin4.write( led2State );
}

/**
 * I am not a fan of the "x = !y;" type statements we see sometimes, plus
 * it's a no-brainer to write a simple function that respects the diff between booleans and integers
 */
function toggleState( stateIn ) {
	if ( stateIn == LOW ) {
		return HIGH;
	}
	else {
		return LOW;
	}
}

/**
 * toggle the state of both leds
 */
function toggleLeds() {
	console.log( 'toggling states' );
	led2State = toggleState( led2State );
	led4State = toggleState( led4State );
	ledPin2.write( led2State );
	ledPin4.write( led4State );
}

/**
 * Main loop that reads the analog in and sets the interval to toggle the leds accordingly
 * Note that we cannot set the intervals up so that we run the loop that
 * reads the analog value more frequently than we toggle the leds
 */
function loop() {
	currentAnalogValue = analogPin0.read();
	if( currentAnalogValue == savedAnalogValue ) {
		console.log( 'value unchanged' );
	} else {
		savedAnalogValue = currentAnalogValue;
		if( savedIntervalId != 0 ) {
			clearInterval( savedIntervalId );
		}
		savedIntervalId = setInterval( toggleLeds, currentAnalogValue );
		console.log( "currentAnalogValue: " + currentAnalogValue );
	}
}

setup();

setInterval( loop, maxAnalogValue );

