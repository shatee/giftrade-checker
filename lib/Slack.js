const fetch = require('node-fetch');
const config = require('../config/config');
const hookURL = config.slack.hookURL;

class Slack {
  static post(channel, text, emoji = ':cow2:') {
    return fetch(hookURL, {
      method: 'POST',
      body: JSON.stringify({
        channel,
        text,
        icon_emoji: emoji
      })
    });
  }
}

exports.Slack = Slack;
