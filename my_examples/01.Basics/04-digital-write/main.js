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
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var ledPin4 = new mraa.Gpio(4);   // setup digital read on Digital pin #4 (D4)
var ledPin5 = new mraa.Gpio(5);   // setup digital read on Digital pin #5 (D5)

ledPin4.dir(mraa.DIR_OUT);        // set the gpio direction to output
ledPin5.dir(mraa.DIR_OUT);        // set the gpio direction to output

var LOW = 0;
var HIGH = 1;

var pin4State = LOW;
var pin5State = HIGH;

function toggleState( lowOrHigh ) {
   if ( lowOrHigh == LOW ) {
      return HIGH;
   } else {
      return LOW;
   }
}
function setStates() {
   pin4State = toggleState( pin4State );
   pin5State = toggleState( pin5State );
   ledPin4.write( pin4State );
   ledPin5.write( pin5State );
}

var delay = 2500;
setInterval( setStates, delay );
