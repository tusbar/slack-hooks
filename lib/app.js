var express     = require('express');
var bodyParser  = require('body-parser');

// ## //

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/mandrill', require('./services/mandrill'));

// ## //

module.exports = app;
