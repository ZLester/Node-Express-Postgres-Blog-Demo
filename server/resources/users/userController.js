var db = require('../../db');

var createOne = function(newUser, callback) {
  var createParams = {
    text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    values: [newUser.name, newUser.email, newUser.password]
  };
  db.query(createParams, function(err) {
    if (err) {
      if (err.constraint === 'user_name_unique') {
        return callback('Username ' + newUser.name + ' already in use.');
      }
      if (err.constraint === 'user_email_unique') {
        return callback('Email ' + newUser.email + ' already in use.')
      }
      return callback(err);
    }
    var queryParams = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [newUser.email]
    }
    db.query(queryParams, function(err, users) {
      if (err) {
        return callback(err);
      }
      var user = users[0] || null;
      callback(null, user);
    });
  });
};

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
};

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
};

var updateOne = function(user_id, updatedProperties, callback) {
  var updateParams = {
    text: 'UPDATE users SET name = $1, email = $2, password = $3 WHERE user_id = $4',
    values: [updatedUser.name, updatedUser.email, updatedUser.password, user_id]
  };
  db.query(updateParams, function(err) {
    if (err) {
      return callback(err);
    }
    retrieveOne(user_id, function(err, user) {
      if (err) {
        return callback(err);
      }
      callback(null, user);
    });
  });
};

var deleteOne = function(user_id, callback) {
  retrieveOne(user_id, function(err, user) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback(null, null);
    }
    var queryParams = {
      text: 'DELETE FROM users WHERE user_id = $1',
      values: [user_id]
    };
    db.query(queryParams, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, user);
    });
  });
};

var retrievePosts = function(user_id, callback) {
  var queryParams = {
    text: 'SELECT users.name AS author, users.email, posts.post_id, posts.created, posts.title, posts.content FROM users INNER JOIN posts ON (users.user_id = posts.author) WHERE users.user_id = $1;',
    values: [user_id]
  };
  db.query(queryParams, function(err, posts) {
    if (err) {
      return callback(err);
    }
    callback(null, posts);
  });
};

module.exports = {
  createOne: createOne,
  retrieve: retrieve,
  retrieveOne: retrieveOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  retrievePosts: retrievePosts
};