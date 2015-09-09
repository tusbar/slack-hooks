var rp  = require('request-promise');

// ## //

var send = function (url, message) {
    return rp.post(url, {
        json: {
            text: message
        }
    });
};

// ## //

exports.send = send;
