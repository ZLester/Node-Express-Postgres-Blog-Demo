var userRouter = require('express').Router();
var userController = require('./userController.js');

userRouter.route('/')
  .get(function(req, res) {
    userController.retrieve(function(err, users) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      res.json({success: true, data: users});
    });
  })
  .post(function(req, res) {
    var newUser = req.body;
    userController.createOne(newUser, function(err, user) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      res.json({success: true, data: user});
    });
  });

userRouter.route('/:user_id')
  .get(function(req, res) {
    var user_id = req.params.user_id;
    userController.retrieveOne(user_id, function(err, user) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      if (!user) {
        return res.status(404).json({success: false, data: null, message: 'User not found'});
      }
      res.json({success: true, data: user});
    });
  })
  .put(function(req, res) {
    var user_id = req.params.user_id;
    var updatedProperties = req.body;
    userController.updateOne(user_id, updatedProperties, function(err, updatedUser) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      if (!updatedUser) {
        return res.status(404).json({success: false, data: null, message: 'User not found'});
      }
      res.json({success: true, data: updatedUser});
    });
  })
  .delete(function(req, res) {
    var user_id = req.params.user_id;
    userController.deleteOne(user_id, function(err, deletedUser) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      if (!deletedUser) {
        return res.status(404).json({success: false, data: null, message: 'User not found'});
      }
      res.json({success: true, data: deletedUser});
    });
  });

userRouter.route('/:user_id/posts')
  .get(function(req, res) {
    var user_id = req.params.user_id;
    userController.retrievePosts(user_id, function(err, posts) {
      if (err) {
        return res.status(500).json({success: false, data: null, message: err});
      }
      res.json({success: true, data: posts});
    });
  });

module.exports = userRouter;
