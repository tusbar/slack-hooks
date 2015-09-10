var express     = require('express');
var bodyParser  = require('body-parser');

// ## //

var app = express();
var apiKey = process.env.API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (apiKey) {
    // If the API_KEY environment variable is not defined,
    // authentication is not enabled.
    app.use(function (req, res, next) {
        if (!req.query.apiKey || req.query.apiKey !== apiKey) {
            // The apiKey querystring parameter does not match
            // the API_KEY environment variable.
            res.sendStatus(403);
        }
        else {
            // All is good.
            next();
        }
    });
}

app.use('/mandrill', require('./services/mandrill'));

// ## //

module.exports = app;
