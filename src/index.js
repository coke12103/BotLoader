const Discord = require('./api.js');
const ServerData = require('./server_data.js');
const _PluginManager = require('./plugin_manager.js');

const PluginBase = require('./plugin_base.js');
exports.PluginBase = PluginBase;

const token = require("../data/token.json").token;
const prefix = "/";
exports.prefix = prefix;

const Client = new Discord();
const Servers = new ServerData();
exports.Servers = Servers;

const PluginManager = new _PluginManager();
exports.PluginManager = PluginManager;

async function main(){
  exports.PluginCount = PluginManager.count();

  Client.login(token);
  Client.on('ready', () => console.log('ready!'));

  Client.on('message', message => {
      if(!message.author.bot && message.guild && !message.content.startsWith(prefix)){
        for(var pl of PluginManager.plugins) pl.onMessage(message);
      }

      if(!message.author.bot && message.guild && message.content.startsWith(prefix)){
        var lines = message.content.split(' ');
        var command = lines.shift().replace(prefix, '');

        for(var pl of PluginManager.plugins){
          for(var com of pl.commands){
            if(com.command == command) pl.onCommand(command, lines, message);
          }
        }
      }
    }
  )
}

main();
