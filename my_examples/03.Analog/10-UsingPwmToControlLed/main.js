/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means.

A simple node.js application intended to read and write analog values to fade a LED from Digital pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require("mraa");   // require mraa
var pwm3 = new mraa.Pwm(3);   // Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin
pwm3.enable(true);

pwm3.period_us( 100 );     // set the period in microseconds.

var brightnessPercent = 0;   // use integers to set intermediate values (floats get messy)
var brightnessValue = 0.0;   // the actual value needs to be in a float > 0 and < 1
var deltaPercent = 5;        // use integers for the math

setInterval(function () {
    if ( 100 <= brightnessPercent ) {
        deltaPercent = -5;
    }
    else if ( brightnessPercent <= 0 ) {
        deltaPercent = 5;
    }
    brightnessPercent += deltaPercent;
    brightnessValue = brightnessPercent / 100;    // Write duty cycle (brightness) value.
    pwm3.write( brightnessValue );                // Write duty cycle (brightness) value.
    // console.log( pwm3.read() );                // read current brightness that is set before.
    console.log( "brigntnessPercent: " + brightnessPercent + ";\t deltaPercent: " + deltaPercent );
}, 100 );
