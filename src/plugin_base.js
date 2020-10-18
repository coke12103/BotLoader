class PluginBase{
  constructor(name = 'New Plugin', description = "none"){
    this.name = name;
    this.description = description;
  }

  onMessage(message){
    return;
  }
}
