const {
    RtmClient,
    WebClient,
    CLIENT_EVENTS
} = require('@slack/client')
const token = 'xoxb-281895990130-E6232SpY6SYOJXvLZBIui3E6' ;

const rtm = new RtmClient(token);
const web = new WebClient(token);

web.chat.postMessage('test', 'Hello Word');

let botUserId;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (data)=> {
  botUserId = data.self.id;
})

const isMessage = (event) => event.type === 'message' && event.text;

const isMessageFromUser = (event, userId) => event.user === userId;

rtm.on(CLIENT_EVENTS.RTM.MESSAGE, (event) =>{
  if (isMessage(event) && !isMessageFromUser(event, botUserId)){
    web.chat.postMessage('général', event.text, (as_user: true));
  }
})

rtm.start();
