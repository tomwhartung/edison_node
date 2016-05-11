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

var pin8Input = new mraa.Gpio( 8 ); // setup digital read on Digital pin #6 (D6)
var loopMs = 1000;                  // loop every second

function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
   pin8Input.dir(mraa.DIR_IN); // set the gpio direction to input
}

function loop() {
  var pin8Value =  pin8Input.read();     // read the digital value of the pin
  console.log( 'Gpio is ' + pin8Value ); // write the read value out to the console
  setTimeout( loop, loopMs );
}

setup();
loop();

