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

//
// Functions
//
function turnItOff() {
	cumulativeMillisecs = 0;
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
 * loop: blink out NODE indefinitely
 * N          O                D              E
 * dash dot   dash dash dash   dash dot dot   dot
 */
function loop() {
	cumulativeMillisecs = 0;
	intervalIdTurnItOff = setTimeout( turnItOff, cumulativeMillisecs );
}
//
// Mainline code
//
setup();

loop();

