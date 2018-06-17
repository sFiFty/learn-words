'use strict';

module.exports = function(Words) {
  Words.translate = function(cb) {
    const Translate = require('@google-cloud/translate');
    const translate = new Translate();
    const text = 'The text to translate, e.g. Hello, world!';
    const target = 'The target language, e.g. ru';
    console.log(target)
    cb(null, target);
    translate
      .translate(text, target)
      .then(results => {
        let translations = results[0];
        translations = Array.isArray(translations)
          ? translations
          : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
          console.log(`${text[i]} => (${target}) ${translation}`);
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
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
