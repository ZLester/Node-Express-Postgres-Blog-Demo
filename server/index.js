var express = require('express');
var app = express();
var config = require('./config/');
var port = config.prod.port || config.dev.port;

require('./middleware')(app, express);
require('./routes')(app);

app.listen(port, function() {
  console.log('zacharylester.com listening on port ' + port);
});
