/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means.
 * A simple node.js application that reads and write analog values to fade a LED from Digital pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
 *
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

var mraa = require("mraa");       // require mraa
var pwm3 = new mraa.Pwm(3);       // Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin
pwm3.enable(true);
pwm3.period_us( 100 );            // set the period in microseconds.
var analogPin0 = new mraa.Aio(0); // setup access analog input Analog pin #0 (A0)

setInterval(function () {
   var analogIntegerValue = 0;
   var analogFloatValue = 0.0;
   analogIntegerValue = analogPin0.read();      // read the value of the analog pin
   analogFloatValue = analogIntegerValue / 1024;
   pwm3.write( analogFloatValue );        // Write duty cycle (brightness) value.
   console.log( "analogIntegerValue: " + analogIntegerValue + "; analogFloatValue: " + analogFloatValue )
}, 100 );
