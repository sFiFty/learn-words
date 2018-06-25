'use strict';

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.db;
ds.discoverAndBuildModels('words', {schema: 'learn-words'},
    function(err, models) {
  if (err) throw err;

  models.Words.find(function(err, accounts) {
    if (err) throw err;

    console.log('Found:', accounts);

    ds.disconnect();
  });
});
