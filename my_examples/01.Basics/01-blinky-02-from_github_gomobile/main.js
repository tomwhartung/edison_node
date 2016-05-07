/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * A simple node.js application intended to blink the onboard LED on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
 *
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 * Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.
 *
 * Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
 * Using a ssh client: 
 * 1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
 * 2. opkg update
 * 3. opkg upgrade
 *
 * Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

var mraa = require('mraa');           // require mraa
var myOnboardLed = new mraa.Gpio(13); // LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
var ledState = true;                  // Boolean to hold the state of Led
var dotMillisecs = 200;
var dashMillisecs = 3 * dotMillisecs;
var elementGapMillisecs = dotMillisecs;
var letterGapMillisecs  = 3 * dotMillisecs;

//
// Functions
//
/**
 * Functions to blink out each of the letters we need
 */
function blinkLetterN() {
	var cumulativeMillisecs = 0;
	setTimeout( function() { myOnboardLed.write( 1 ); }, cumulativeMillisecs );
	cumulativeMillisecs += dashMillisecs;
	setTimeout( function() { myOnboardLed.write( 0 ); }, cumulativeMillisecs );
	cumulativeMillisecs += elementGapMillisecs;
	setTimeout( function() { myOnboardLed.write( 1 ); }, cumulativeMillisecs );
	cumulativeMillisecs += dotMillisecs;
	setTimeout( function() { myOnboardLed.write( 0 ); }, cumulativeMillisecs );
	return cumulativeMillisecs;
};
/**
 * setup: called once in mainline code
 */
function setup() {
	console.log('MRAA Version: ' + mraa.getVersion()); // write the mraa version to the Intel XDK console
	myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
}
/**
 * loop: called indefinitely by mainline code
 */
function loop() {
	// myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
	// ledState = !ledState; //invert the ledState
	// setTimeout(loop,1000); //call the indicated function after 1 second (1000 milliseconds)
	var letterIntervalId = 0;
	var letterNMillisecs =
		dashMillisecs + elementGapMillisecs +
		dotMillisecs + letterGapMillisecs;
	var allLettersMillisecs =
		letterNMillisecs + letterGapMillisecs;
	letterIntervalId = setInterval( blinkLetterN, letterNMillisecs );
}
//
// Mainline code
//
setup();

loop();

