'use strict';

const log = require('debug')('mock-fiberlamp-api');
const faService = require('./fiberlamp-service');

///////////////////////////////////////////////////////////////////////////////
//
// This is prolly the worst way to handle incoming messages, but since there
// are very few endpoints it should be ok to just switch on 'addr' and handle
// accordingly.
//
// endpoints lifted from: https://github.com/pierredepaz/fiberlamp-hid
//
///////////////////////////////////////////////////////////////////////////////
const api = {
  handle(addr, args) {
    switch (addr) {
      case '/change':
        faService.handleChange(args);
        break;
      case '/color':
        faService.handleColor(args);
        break;
      case '/heartbeat':
        faService.handleHeartbeat(args);
        break;
      case '/black':
        faService.handleBlack();
        break;

      // debug //
      case '/status':
        faService.printStatus();
        break;

      default:
        log(`unsupported address: ${addr}`);
        break;
    }
  }
}

module.exports = api;