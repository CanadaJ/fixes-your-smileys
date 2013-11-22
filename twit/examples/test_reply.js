var Bot = require('./bot')
  , config1 = require('../config1');

var bot = new Bot(config1);

console.log('RTD2: Running.');

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

setInterval(function() {

  //var nonewfriends = ['jcanada', 'babbycanada', 'mayerm8', 'rageriancronin', 'brettcanada', 'metool', 'trice509'];
  var nonewfriends = ['jcanada'];
  bot.twit.get('followers/ids', function(err, reply) {
    if(err) return handleError(err)
    console.log('\n# followers:' + reply.ids.length.toString());
  });
  for(var i = 0; i < nonewfriends.length; i++) {
    bot.twit.get('statuses/user_timeline', {screen_name: nonewfriends[i], count: 10}, function (err, reply) {
      if(err) return handleError(err);
      var name = nonewfriends[i];
      var tweets = reply, idx = tweets.length;
      while(idx--) {
        var tweet = tweets[idx];
        if(tweet.text.indexOf(':)') !== -1) {
          bot.reply('@' + tweet.user.screen_name  +' "' + tweet.text + '"' + ' *:^) fixed that for you' , tweet.id_str, function (err, reply) {
            if(err) return handleError(err);
            console.log('tweeted bby');
          })
        }
      }
    })
  }
}, 60000);

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
  console.error(err);
}
