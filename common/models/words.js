'use strict';

const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'learn-words-1529040299992';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

module.exports = function(Words) {
  Words.translate = function(data, cb) {
    const target = data.language;
    translate
      .translate(data.text, target)
      .then(results => {
        const translation = results[0];
        cb(null, translation);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  };

  Words.remoteMethod(
    'translate', {
      http: {
        path: '/translate',
        verb: 'post',
      },
      accepts: {
        arg: 'text',
        type: 'object',
      },
      returns: {
        arg: 'translation',
        type: 'string',
      },
    }
  );
};
