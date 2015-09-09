var express = require('express');

// ## //

var router = express.Router();

router
    .route('/')

    .head(function (req, res) {
        res.sendStatus(200);
    })

    .post(function (req, res) {
        console.log(req.body);
        res.sendStatus(200);
    });

// ## //

module.exports = router;
