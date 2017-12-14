const util = require('util')
const {Router} = require('express')

const slack = require('../slack')

// ## //

const router = new Router()
const webhook = {
  url: process.env.MANDRILL_WEBHOOK_URL
}

const format = msg => {
  // eslint-disable-next-line default-case
  switch (msg.state) {
    case 'bounced':
    case 'soft-bounced': {
      return util.format(
        '<mailto:%s|%s>: <https://mandrillapp.com/activity/bounce?id=%s|%s> (%s)',
        msg.email,
        msg.email,
        msg._id,
        msg.state,
        msg.bounce_description
      )
    }
    case 'rejected': {
      return util.format(
        '<mailto:%s|%s>: was rejected (check blacklists)',
        msg.email,
        msg.email
      )
    }
  }
}

router
  .route('/')

  .head((req, res) => {
    res.sendStatus(200)
  })

  .post(async (req, res) => {
    const events = JSON.parse(req.body.mandrill_events)

    try {
      await Promise.all(
        events.map(event => slack.send(webhook.url, format(event.msg)))
      )

      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(500)
    }
  })

// ## //

module.exports = router
