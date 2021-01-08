const Discord = require('./api.js');
const _PluginManager = require('./plugin_manager.js');
const _PluginsData = require('./plugin_data.js');
const PluginBase = require('./plugin_base.js');

exports.PluginBase = PluginBase;

const Client = new Discord();
const PluginsData = new _PluginsData();
exports.PluginsData = PluginsData;

const PluginManager = new _PluginManager();
exports.PluginManager = PluginManager;

var token, config, prefix;

function data_init(){
  try{
    token = require("../data/token.json").token;
    config = require("../data/config.json");
  }catch(err){
    console.log(err);
    process.exit(1);
  }

  prefix = config.prefix;
  exports.prefix = prefix;
}

async function main(){
  data_init();

  exports.PluginCount = PluginManager.count();

  Client.login(token);
  Client.on('ready', () => console.log('ready!'));

  Client.on('message', message => {
      if(!message.author.bot && message.guild){
        // コマンドじゃない場合
        if(!message.content.startsWith(prefix)){
          for(var pl of PluginManager.plugins) pl.onMessage(message);
        }

        // コマンドの場合
        if(message.content.startsWith(prefix)){
          var lines = message.content.split(' ');
          var command = lines.shift().replace(prefix, '');

          for(var pl of PluginManager.plugins){
            for(var com of pl.commands){
              if(com.command == command) pl.onCommand(command, lines, message);
            }
          }
        }
      }
    }
  )
}

main();
