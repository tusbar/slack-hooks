var express = require('express');
var Promise = require('bluebird');
var rp      = require('request-promise');
var util    = require('util');

// ## //

var router = express.Router();
var webhook = {
    url: process.env.MANDRILL_WEBHOOK_URL
};

var format = function (msg) {
    switch (msg.state) {
        case 'bounced':
            return util.format('<mailto:%s|%s>: <https://mandrillapp.com/activity/bounce?id=%s|bounced> (%s)', msg.email, msg.email, msg._id, msg.bounce_description)
        case 'soft-bounced':
            return util.format('<mailto:%s|%s>: <https://mandrillapp.com/activity/bounce?id=%s|soft-bounced> (%s)', msg.email, msg.email, msg._id, msg.bounce_description)
        case 'rejected':
            return util.format('<mailto:%s|%s>: was rejected (check blacklists)', msg.email, msg.email)
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
                return rp.post(webhook.url, {
                    json: {
                        text: format(event.msg)
                    }
                })
            })
            .finally(function () {
                res.sendStatus(200);
            });
    });

// ## //

module.exports = router;