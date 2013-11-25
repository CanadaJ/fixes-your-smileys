var Twit = require('twit');
var config = require('./config1');
var T = new Twit(config);

var interval = process.argv.splice(2);

console.log('Running...');
setInterval(function() {
  console.log('Getting tweets...');
  T.get('statuses/home_timeline', { }, function (err, reply) {
    if(err) return handleError(err)    
    var count = reply.length;
    for(var i = 0; i < count; i++) {
      var username = reply[i].user.screen_name;      
      var text = reply[i].text;
      var id_str = reply[i].id_str;
      console.log(username + '\n' + text + '\n');
      if(username === 'FixesSmileys') continue;
      if(text.indexOf(':)') !== -1) {
        var status = '@' + username + ' "' + text + '" \n\n*:^) fixed that for you'; 
        T.post('statuses/update', { status: status, in_reply_to_status_id: id_str }, function (err, reply) {
            if(err) return handleError(err)
            console.log('tweet successful');          
        })	
      }
    }	
  })
}, parseInt(interval));

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
