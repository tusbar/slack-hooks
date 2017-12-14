const rp = require('request-promise')

// ## //

const send = (url, message) => rp.post(url, {
  json: {
    text: message
  }
})

// ## //

exports.send = send
