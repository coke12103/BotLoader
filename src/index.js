const Discord = require('./api.js');
const ServerData = require('./server_data.js');
const Loader = require('./loader.js');

const PluginBase = require('./plugin_base.js');
exports.PluginBase = PluginBase;

const token = require("../data/token.json").token;
const prefix = "/";

const Client = new Discord();
const Servers = new ServerData();
exports.Servers = Servers;

async function main(){
  var plugins = Loader.load();

  Client.login(token);
  Client.on('ready', () => console.log('ready!'));

  Client.on('message', message => {
      if(!message.author.bot && message.guild && !message.content.startsWith(prefix)){
        for(var pl of plugins) pl.onMessage(message);
      }

      if(!message.author.bot && message.guild && message.content.startsWith(prefix)){
        var lines = message.content.split(' ');
        var command = lines.shift().replace(prefix, '');

        for(var pl of plugins){
          for(var com of pl.commands){
            if(com.command == command) pl.onCommand(command, lines, message);
          }
        }
      }
    }
  )
}

main();
