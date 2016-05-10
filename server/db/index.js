var pg = require('pg');
var config = require('../config');
var url = config.prod.conString || config.dev.conString;

pg.defaults.ssl = true;

module.exports = {
  query: function(params, callback) {
    pg.connect(url, function(err, client, done) {
      if (err) {
        return callback(err);
      }
      client.query(params, function(err, results) {
        if (err) {
          return callback(err);
        }
        callback(null, results.rows);
        done();
      })
    });
  }
};