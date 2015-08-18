request = require 'superagent'
{ MAILCHIMP_KEY } = require '../../config'

@index = (req, res) ->
  email = res.locals.sd.CURRENT_USER?.email
  subscribed email, (cb) ->
    res.locals.sd.MAILCHIMP_SUBSCRIBED = if cb then 'subscribed' else 'unsubscribed'
    res.render 'index'

subscribed = (email, callback) ->
  request.get('https://us1.api.mailchimp.com/2.0/lists/member-info')
    .query(
      apikey: MAILCHIMP_KEY
      id: sd.GALLERY_INSIGHTS_LIST
    ).query("emails[0][email]=#{email}").end (err, response) ->
      callback response.body.success_count is 1
