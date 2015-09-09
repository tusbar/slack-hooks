# slack-hooks

> Simple HTTP API that proxies Webhooks for Slack.

## Description

This project provides Webhooks to link Slack and services that aren’t
compatible with Slack’s Webhooks API.

You should create a Webhooks integration for each service.

## Authentication

This API provides a simple authentication mechanism by providing the
`API_KEY` environment variable.

When set, all API calls will require the `apiKey` querystring variable
to be set, and to match the environment variable’s value.

## Available services

### Mandrill

Define the `MANDRILL_WEBHOOK_URL` environment variable with the Slack
Webhook URL.

Then, create a Mandrill Webhook that is triggered when

* Message is Bounced
* Message is Rejected
* Message is Soft-Bounced

And set the 'Post To Url' field to `<base-url>/mandrill`.

## License

MIT
