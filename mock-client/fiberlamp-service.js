'use strict';

const cursor = require('ansi')(process.stdout);
const chalk = require('chalk');
const log = require('debug')('mock-fiberlamp-service');

///////////////////////////////////////////////////////////////////////////////
//
// The actual magic. simulate an actual implementation of the HID protocol
// and how the fiberlamp _might_ respond...
//
// We will also keep track of various state: current color, etc...
//
///////////////////////////////////////////////////////////////////////////////
const state = {
  rgb: [255,255,255] // initialize to white?
};


exports.handleChange = function handleChange(args) {
  if (args.length !== 3) {
    log(chalk.red(`ERROR: expected 3 arguments but only got ${args.length}: [ ${args.join()} ]`));
    return;
  }

  log(`snapping to color: [ ${args.join()} ]`);
  state.rgb = args.slice(0).map(n => Number(n));
}


exports.handleColor = function handleColor(args) {
  if (args.length !== 4) {
    log(chalk.red(`ERROR: expected 4 arguments but only got ${args.length}: [ ${args.join()} ]`));
    return;
  }

  log(`tweening to color: [ ${args.slice(0,3).join()} ] over ${args[3]}s`);

  // THIS IS SOME SERIOUS BLOCKING!!!! the next request will get processed and added to the messaging
  // queue but it won't be executed until this loop completes. Following the current implementaion 
  // of illuminator.py
  let now = Date.now();
  do {
    let dt = Math.abs(now - Date.now());
    cursor.horizontalAbsolute(0).eraseLine()
      .write(`${dt}`);

  } while (Math.abs(now - Date.now()) <= Number(args[3]) * 1000);
  console.log('');
  state.rgb = args.slice(0,3).map(n => Number(n)); 
}


exports.handleHeartbeat = function handleHeartbeat(args) {
  if (args.length !== 4) {
    log(chalk.red(`ERROR: expected 4 arguments but only got ${args.length}: [ ${args.join()} ]`));
    return;
  }

  log(`heartbeating from: [ ${state.rgb.join()} ] to: [ ${args.slice(0,3).join()} ] over ${args[3]}s`); 
}


exports.handleBlack = function handleBlack() {
  log('setting to black');
  state.rgb = [0,0,0]; 
}

exports.printStatus = function printStatus() {
  log(chalk.magenta(`state.rgb = [ ${state.rgb.join()} ]`));
}
