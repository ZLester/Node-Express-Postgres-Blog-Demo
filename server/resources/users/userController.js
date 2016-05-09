var db = require('../../db');

var createOne = function(newUser, callback) {
  var queryParams = {
        text: 'INSERT INTO users (name, email, password) VALUES ($1, $2)',
        values: [newUser.name, newUser.email, newUser.password]
    };
  db.query(queryParams, function(err, users) {
    console.log(err, users);
    if (err) {
      return callback(err);
    }
    var user = users[0] || null;
    callback(null, user);
  });
}

var retrieve = function(callback) {
  var queryParams = {
      text: 'SELECT * FROM users',
  };
  db.query(queryParams, function(err, users) {
    if (err) {
      return callback(err);
    }
    callback(null, users);
  });
}

var retrieveOne = function(user_id, callback) {
  var queryParams = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [user_id]
  };
  db.query(queryParams, function(err, users) {
    if (err) {
      return callback(err);
    }
    var user = users[0] || null;
    callback(null, user);
  });
}

var updateOne = function(user_id, updatedProperties, callback) {
  var updatedUser = Object.assign(users[1], updatedProperties);
  callback(null, updatedUser);
}

var deleteOne = function(user_id, callback) {
  var queryParams = {
        text: 'DELETE FROM users WHERE user_id = $1',
        values: [user_id]
    };
    db.query(queryParams, function(err, users) {
      console.log(err, users);
      if (err) {
        return callback(err);
      }
      var user = users[0] || null;
      callback(null, user);
    });
}

module.exports = {
  createOne: createOne,
  retrieve: retrieve,
  retrieveOne: retrieveOne,
  updateOne: updateOne,
  deleteOne: deleteOne
}