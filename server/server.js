var express = require('express');
var app = express();

var port = 3000;

require('./middleware')(app, express);
require('./routes')(app);

app.listen(port, function() {
  console.log('zacharylester.com listening on port ' + port);
});
