'use strict';

module.exports = function(Words) {
  Words.translate = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  }
  Words.remoteMethod(
    'translate', {
      http: {
        path: '/translate',
        verb: 'get'
      },
      returns: {
        arg: 'translation',
        type: 'string'
      }
    }
  );
};
