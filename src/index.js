const Discord = require('./api.js');
const ServerData = require('./server_data.js');
const token = require("../data/token.json").token;

const Client = new Discord();
const Servers = new ServerData();

async function main(){
  Client.login(token);
  Client.on('ready', () => console.log('ready!'));
  Client.on('message', mes => {
      if(!mes.guild) return;

      var server = Servers.get(mes.guild.id);
      console.log(server);

      if(mes.content == "ping") mes.channel.send(`pong, ${server.id}`);
    }
  )
}

main();
