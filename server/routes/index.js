var userRouter = require('../resources/users/userRouter.js');
var postRouter = require('../resources/posts/postRouter.js');
var commentRouter = require('../resources/comments/commentRouter.js');
var tagRouter = require('../resources/tags/tagRouter.js');

module.exports = function(app) {
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/tags', tagRouter);
}
