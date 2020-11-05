const App = require('../../');
const AppInfo = require('../../package.json');

class About extends App.PluginBase{
  constructor(){
    super('About', 'システム情報を表示します');
    super.addCommand('about', 'あぼーと!');

    try{
      this.more_info = require("../../more_info.json").texts;
    }catch(e){
      this.more_info = [];
      console.log(e);
    }
  }

  onCommand(command, argv, message){
    message.channel.send(`**${AppInfo.name} ${AppInfo.version}**\n${App.PluginCount}個のプラグインが読み込まれています。\n\n${this.more_info.join("\n")}`);
  }
}

module.exports = About;
