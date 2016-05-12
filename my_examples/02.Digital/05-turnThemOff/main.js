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
var onboardLed = new mraa.Gpio(13); // LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
var ledState = true;                  // Boolean to hold the state of Led

//
// Used by 04-digital-write - sometimes we want to turn them off.
//
var ledPin2 = new mraa.Gpio(2);   // setup digital read on Digital pin #2 (D2)
var ledPin3 = new mraa.Gpio(3);   // setup digital read on Digital pin #3 (D3)
var ledPin4 = new mraa.Gpio(4);   // setup digital read on Digital pin #4 (D4)

//
// Functions
//
function turnOnboardLedOff() {
	onboardLed.write( 0 );
};

function turnPin2Off() {
   ledPin2.write( 0 );
}
function turnPin3Off() {
   ledPin3.write( 0 );
}
function turnPin4Off() {
   ledPin4.write( 0 );
}
function turnThemOff() {
   turnOnboardLedOff();
   turnPin2Off();
   turnPin3Off();
   turnPin4Off();
}

/**
 * setup: called once in mainline code
 */
function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); // write the mraa version to the Intel XDK console
   onboardLed.dir( mraa.DIR_OUT );     // set the gpio direction to output
   ledPin2.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin3.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin4.dir( mraa.DIR_OUT );        // set the gpio direction to output
}
/**
 * loop: NOT - looping is totally unnecessary for this trivial program
 */
function loop() {
	turnThemOff();
}
//
// Mainline code
//
setup();

loop();

