/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * A simple node.js application intended to write data to Digital pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
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

var mraa = require('mraa'); //require mraa

var ledPin2 = new mraa.Gpio(2);   // setup digital read on Digital pin #2 (D2)
var ledPin3 = new mraa.Gpio(3);   // setup digital read on Digital pin #3 (D3)
var ledPin4 = new mraa.Gpio(4);   // setup digital read on Digital pin #4 (D4)

var LOW = 0;
var HIGH = 1;

var pin2State = LOW;
var pin3State = LOW;
var pin4State = LOW;

function toggleState( lowOrHigh ) {
   if ( lowOrHigh == LOW ) {
      return HIGH;
   } else {
      return LOW;
   }
}
function writeInitialStates() {
   ledPin2.write( pin2State );
   ledPin3.write( pin3State );
   ledPin4.write( pin4State );
}

function togglePin2State() {
   pin2State = toggleState( pin2State );
   ledPin2.write( pin2State );
}
function togglePin3State() {
   pin3State = toggleState( pin3State );
   ledPin3.write( pin3State );
}
function togglePin4State() {
   pin4State = toggleState( pin4State );
   ledPin4.write( pin4State );
}
function togglePin5State() {
   pin5State = toggleState( pin5State );
   ledPin5.write( pin5State );
}

function setRandomCycleMs( min, max ) {
   var range = max - min;
   randomCycleMs = ( Math.random() * range ) + min;
   return Math.round( randomCycleMs );
}

var MIN_CYCLE_MS =  500;
var MAX_CYCLE_MS = 5000;

var pin2CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );
var pin3CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );
var pin4CycleMs = setRandomCycleMs( MIN_CYCLE_MS, MAX_CYCLE_MS );

/**
 * Initialize our leds 
 *
 */
function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
   console.log( 'pin2CycleMs: ' + pin2CycleMs );
   console.log( 'pin3CycleMs: ' + pin3CycleMs );
   console.log( 'pin4CycleMs: ' + pin4CycleMs );
   ledPin2.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin3.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin4.dir( mraa.DIR_OUT );        // set the gpio direction to output
   writeInitialStates();
}

function loop() {
   setInterval( togglePin2State, pin2CycleMs );
   setInterval( togglePin3State, pin3CycleMs );
   setInterval( togglePin4State, pin4CycleMs );
}

setup();

loop();
