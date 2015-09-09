var app = require('./lib/app');

// ## //

var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';

app.listen(port, host, function () {
    console.log('slack-hooks: listening on %s:%s', host, port);
});
