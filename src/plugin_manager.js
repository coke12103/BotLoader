const Loader = require('./loader.js');

class PluginManager{
  constructor(){
    this.plugins = Loader.load();
  }

  count(){
    return this.plugins.length;
  }

  list_plugins(){
    var result = [];

    for(var pl of this.plugins){
      result.push({ name: pl.name, description: pl.description, commands: pl.commands });
    }

    return result;
  }
}

module.exports = PluginManager;
