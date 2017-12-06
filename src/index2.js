var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var rtm = new RtmClient('xoxb-281895990130-E6232SpY6SYOJXvLZBIui3E6');
rtm.start();

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='général') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("NTM CISSE!", channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    if (message.channel === channel)
        console.log(message);
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    if (message.channel === channel)
        rtm.sendMessage("<@" + message.user + "> 🎵On s'en bat les couilles🎵", message.channel);
});
