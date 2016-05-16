/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * A simple node.js application intended to write data to Digital pins on the Intel based
 * development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
 *
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 *   Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane
 *   API with port nanmes/numbering that match boards & with bindings to javascript & python.
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

var ledPin2 = new mraa.Gpio(2);   // setup digital pin #2 (D2)
var ledPin3 = new mraa.Gpio(3);   // setup digital pin #3 (D3)
var ledPin4 = new mraa.Gpio(4);   // setup digital pin #4 (D4)

var LOW = 0;
var HIGH = 1;

var MIN_CYCLE_MS =  500;
var MAX_CYCLE_MS = 5000;

var ledPin2State = LOW;
var ledPin3State = LOW;
var ledPin4State = LOW;

var led2CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );
var led3CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );
var led4CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );

/*
 * Functions to toggle and set states as appropriate
 */
function setRandomCycleMs( min, max ) {
   var range = max - min;
   randomCycleMs = ( Math.random() * range ) + min;
   return Math.round( randomCycleMs );
}
function writeInitialStates() {
   ledPin2.write( ledPin2State );
   ledPin3.write( ledPin3State );
   ledPin4.write( ledPin4State );
}

function toggleState( lowOrHigh ) {
   if ( lowOrHigh == LOW ) {
      return HIGH;
   } else {
      return LOW;
   }
}

function togglePin2State() {
   ledPin2State = toggleState( ledPin2State );
   ledPin2.write( ledPin2State );
}
function togglePin3State() {
   ledPin3State = toggleState( ledPin3State );
   ledPin3.write( ledPin3State );
}
function togglePin4State() {
   ledPin4State = toggleState( ledPin4State );
   ledPin4.write( ledPin4State );
}
function togglePin5State() {
   pin5State = toggleState( pin5State );
   ledPin5.write( pin5State );
}

/**
 * setup: initialize our leds 
 */
function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
   console.log( 'led2CycleMs: ' + led2CycleMs );
   console.log( 'led3CycleMs: ' + led3CycleMs );
   console.log( 'led4CycleMs: ' + led4CycleMs );
   ledPin2.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin3.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin4.dir( mraa.DIR_OUT );        // set the gpio direction to output
   writeInitialStates();
}
/*
 * loop: set intervals to random values
 */
function loop() {
   setInterval( togglePin2State, led2CycleMs );
   setInterval( togglePin3State, led3CycleMs );
   setInterval( togglePin4State, led4CycleMs );
}

setup();

loop();
