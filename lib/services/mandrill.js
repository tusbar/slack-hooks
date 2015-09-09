var express = require('express');
var Promise = require('bluebird');
var util    = require('util');

var slack   = require('../slack');

// ## //

var router = express.Router();
var webhook = {
    url: process.env.MANDRILL_WEBHOOK_URL
};

var format = function (msg) {
    switch (msg.state) {
        case 'bounced':
        case 'soft-bounced': {
            return util.format(
                '<mailto:%s|%s>: <https://mandrillapp.com/activity/bounce?id=%s|%s> (%s)',
                msg.email,
                msg.email,
                msg._id,
                msg.state,
                msg['bounce_description']
            );
        }
        case 'rejected': {
            return util.format(
                '<mailto:%s|%s>: was rejected (check blacklists)',
                msg.email,
                msg.email
            );
        }
    }
};

router
    .route('/')

    .head(function (req, res) {
        res.sendStatus(200);
    })

    .post(function (req, res) {
        var events = JSON.parse(req.body['mandrill_events']);

        Promise
            .map(events, function (event) {
                return slack.send(webhook.url, format(event.msg));
            })
            .finally(function () {
                res.sendStatus(200);
            });
    });

// ## //

module.exports = router;
