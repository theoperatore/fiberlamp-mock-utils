'use strict';

require('localenv');

///////////////////////////////////////////////////////////////////////////////
//
// This is a mock osc client, in particular, the fiberlamp osc client.
//
// The API for this client should be the same as the one the fiberlamp provides
// and should be maintained in the fiberlamp-api.js module.
//
// Set the server SERVER_IP_ADDRESS in the .env file and send messages via
// ./bin/osc-send <addr> <msgs...>
//
///////////////////////////////////////////////////////////////////////////////

const osc = require('node-osc');
const log = require('debug')('client');
const mockFiberlamp = require('./fiberlamp-api');

// this library has the classical client-server relationship in reverse. only a "Server"
// can listen for osc messages, and only a "Client" can send messages...strange.
let client = new osc.Server(Number(process.env.OSC_PORT), process.env.SERVER_IP_ADDRESS);


log(`spooling up client...`);
log(`listening: ${process.env.SERVER_IP_ADDRESS}:${process.env.OSC_PORT}`);


client.on('message', (msg, rinfo) => {
  let addr = msg[0];
  let args = msg.slice(1);
  log(rinfo);
  mockFiberlamp.handle(addr, args);
});