const App = require('../index.js');

class PluginData{
  constructor(data){
    this.load(data);
  }

  load(data){
    if(data.id) this.id = data.id;

    if(data.storage && Object.keys(data.storage) && this.storage) Object.assign(this.storage, data.storage);
    else if(data.storage && Object.keys(data.storage)) this.storage = data.storage;
    else this.storage = {};
  }

  set(key, data){
    this.storage[key] = data;
    App.PluginsData.sync();
  }

  get(key){
    return this.storage[key];
  }

  json(){
    return { id: this.id, storage: this.storage };
  }
}

module.exports = PluginData;
