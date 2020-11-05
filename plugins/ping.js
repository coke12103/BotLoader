const App = require('../src/index');

class Ping extends App.PluginBase{
  constructor(){
    super('Ping', 'ping!');
  }

  onMessage(mes){
    if(mes.content == "ping") {
      mes.channel.send(`pong, ${mes.author.username}!`);
    }
  }
}

module.exports = Ping;
