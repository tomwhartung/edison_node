/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * A simple node.js application intended to read data from Digital pins on the Intel based 
 *   development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
 *
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 * Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with 
 *   port nanmes/numbering that match boards & with bindings to javascript & python.
 *
 * Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
 * Using a ssh client: 
 * 1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
 * 2. opkg update
 * 3. opkg upgrade
 *
 * Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

var mraa = require('mraa'); //require mraa

var pin7Sensor = new mraa.Gpio( 7 ); // setup digital read on Digital pin #7 (D7)
var pin2Led = new mraa.Gpio( 4 );    // setup digital read on Digital pin #4 (D4)

var OFF = 0;
var ON = 1;

var pin2State = OFF;
var loopMs = 333;

/*
 * Functions - useful subroutines
 */
function turnOffPin2() {
   myConsoleLog( 'Turning off pin2State ' );
   pin2Led.write( OFF );
}
function turnOnPin2() {
   myConsoleLog( 'Turning on pin2State ' );
   pin2Led.write( ON );
}
/*
 * Allow for running quietly, and for seeing the debug output when we want to see it
 */
var DEBUG = ON;
// var DEBUG = OFF;
function myConsoleLog( msg ) {
   if ( DEBUG === ON ) {
      console.log( msg );
   }
}

/**
 * Setup the sensor input on pin 7 and the led as output on pin 2
 */
function setup() {
   console.log( 'MRAA Version: ' + mraa.getVersion() );
   pin7Sensor.dir( mraa.DIR_IN );   // button: set the gpio direction to input
   pin2Led.dir( mraa.DIR_OUT );     // led: set the gpio direction to output
}
/**
 * This loop is called by setInterval and is not recursive
 */
function loop() {
   var pin7Value =  pin7Sensor.read();      // read the digital value of the pin
   myConsoleLog( 'Gpio is ' + pin7Value );  // write the read value out to the console
   if ( pin7Value == 1 ) {
      turnOnPin2();
   } else {
      turnOffPin2();
   }
}

/*
 * Mainline: call setup and loop
 */
setup();
setInterval( loop, loopMs );

