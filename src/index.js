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
          for(var pl of PluginManager.plugins){
            // プラグインでエラーされると落ちるので対策
            try{
              pl.onMessage(message);
            }catch(err){
              console.log(err);
              // Discord内に通知するオプション
              if(config.error_display_on_discord) message.channel.send(`:x: **プラグイン内の処理で何かが失敗しました!**\n該当プラグイン名: ${pl.name}`);
            }
          }

        }

        // コマンドの場合
        if(message.content.startsWith(prefix)){
          var lines = message.content.split(' ');
          var command = lines.shift().replace(prefix, '');

          for(var pl of PluginManager.plugins){
            for(var com of pl.commands){
              if(com.command == command){
                // プラグインでエラーされると落ちるので対策
                try{
                  pl.onCommand(command, lines, message);
                }catch(err){
                  console.log(err);
                  // Discord内に通知するオプション
                  if(config.error_display_on_discord) message.channel.send(`:x: **プラグイン内の処理で何かが失敗しました!**\n該当プラグイン名: ${pl.name}`);
                }
              }
            }
          }
        }
      }
    }
  )
}

main();
