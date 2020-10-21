class PluginBase{
  constructor(name = 'New Plugin', description = "none"){
    this.name = name;
    this.description = description;
    this.commands = [];
  }

  onMessage(message){
    return;
  }

  onCommand(command, argv, message){
    return;
  }

  addCommand(command, description = "none"){
    this.commands.push({command: command, description: description});
  }
}

module.exports = PluginBase;
