// Drive the Grive RGB LCD (a JHD1313m1)
// We can do this in either of two ways
//
// The bext way is to use the upm library. which
// contains support for this device
//
// The alternative way is to drive the LCD directly from
// Javascript code using the i2c interface directly
// This approach is useful for learning about using
// the i2c bus. The lcd file is an implementation
// in Javascript for some of the common LCD functions

// configure jshint
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

// change this to false to use the hand rolled version
// var useUpmVersion = true;
var useUpmVersion = false;

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();

if (version >= 'v0.6.1') {
    console.log('mraa version (' + version + ') ok');
}
else {
    console.log('meaa version(' + version + ') is old - this code may not work');
}

useLcd();

/**
 * Rotate through a color pallette and display the
 * color of the background as text
 */
function turnItOff(display) {
    var red = 0;
    var green = 0;
    var blue = 0;
    display.setColor(red, green, blue);
}

/**
 * Use the hand rolled lcd.js code to do the
 * same thing as the previous code without the
 * upm library
 */
function useLcd() {
    var lcd = require('./lcd');
    var display = new lcd.LCD(0);

    display.setColor(0, 60, 255);
    display.setCursor(1, 1);
    display.write('hi there');
    display.setCursor(0,0);  
    display.write('more text');
    display.waitForQuiescent()
    .then(function() {
        turnItOff(display);
    })
    .fail(function(err) {
        console.log(err);
        display.clearError();
        turnItOff(display);
    });
}
