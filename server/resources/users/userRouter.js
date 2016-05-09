var userRouter = require('express').Router();
var userController = require('./userController.js');

userRouter.route('/')
  .get(function(req, res) {
    userController.retrieve(function(err, users) {
      if (err) {
        return res.status(500).json({success: false, message: err});
      }
      res.json({success: true, data: users});
    });
  })
  .post(function(req, res) {
    var user = req.body;
    userController.createOne(function(err, createdUser) {
      if (err) {
        return res.status(500).json({success: false, message: err});
      }
      res.json({success: true, data: createdUser});
    });
  });

userRouter.route('/:user_id')
  .get(function(req, res) {
    var user_id = req.params.user_id;
    userController.retrieveOne(user_id, function(err, user) {
      if (err) {
        return res.status(500).json({success: false, message: err});
      }
      if (!user) {
        return res.status(404).json({success: false, message: 'User not found'});
      }
      res.json({success: true, data: user});
    });
  })
  .put(function(req, res) {
    var user_id = req.params.user_id;
    var updatedProperties = req.body;
    userController.updateOne(user_id, updatedProperties, function(err, updatedUser) {
      if (err) {
        return res.status(500).json({success: false, data: err});
      }
      res.json(updatedUser);
    });
  })
  .delete(function(req, res) {
    var user_id = req.params.user_id;
    userController.deleteOne(user_id, function(err, deletedUser) {
      if (err) {
        return res.status(500).json({success: false, message: err});
      }
      res.json(deletedUser);
    });
  });

module.exports = userRouter;
