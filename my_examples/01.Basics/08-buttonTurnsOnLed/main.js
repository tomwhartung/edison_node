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

var pin8Button = new mraa.Gpio( 8 ); // setup digital read on Digital pin #6 (D6)
var pin4Led = new mraa.Gpio( 4 );    // setup digital read on Digital pin #4 (D4)

var OFF = 0;
var ON = 1;

var pin4State = OFF;
var loopMs = 333;

/*
 * Functions - useful subroutines
 */
function turnOffPin4() {
   myConsoleLog( 'Turning off pin4State ' );
   pin4Led.write( OFF );
}
function turnOnPin4() {
   myConsoleLog( 'Turning on pin4State ' );
   pin4Led.write( ON );
}
/*
 * Allow for running quietly, and for seeing the debug output when we want to see it
 */
// var DEBUG = ON;
var DEBUG = OFF;
function myConsoleLog( msg ) {
   if ( DEBUG === ON ) {
      console.log( msg );
   }
}

/*
 * Functions - setup and loop
 */
function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
   pin8Button.dir( mraa.DIR_IN );   // button: set the gpio direction to input
   pin4Led.dir( mraa.DIR_OUT );     // led: set the gpio direction to output
}

function loop() {
   var pin8Value =  pin8Button.read();     // read the digital value of the pin
   myConsoleLog( 'Gpio is ' + pin8Value );  // write the read value out to the console
   if ( pin8Value == 1 ) {
      turnOnPin4();
   } else {
      turnOffPin4();
   }
   setTimeout( loop, loopMs );
}

/*
 * Mainline: call setup and loop
 */
setup();
loop();

