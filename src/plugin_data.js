const File = require('./file.js');
const PluginDataModel = require('./models/plugin_data.js');

class PluginData{
  constructor(){
    if(!File.exist_check('./data/plugins')) File.mkdir('./data/plugins');

    this.plugins = {};

    if(!File.exist_check('./data/plugins/index.json')) File.json_write('./data/plugins/index.json', { index: [] });

    try{
      var index = JSON.parse(File.load('./data/plugins/index.json')).index;

      for(var i of index){
        this.plugins[i] = new PluginDataModel(JSON.parse(File.load(`./data/plugins/${i}.json`)));
      }
    }catch(e){
      console.log(e);
      process.exit(1);
    }
  }

  get(id){
    if(!this.plugins[id]) this.set(id, { id: id, storage: {} });

    return this.plugins[id];
  }

  set(id, data){
    if(!this.plugins[id]) this.plugins[id] = new PluginDataModel(data);
    else this.plugins[id].set(data);

    this.sync();
  }

  sync(){
    try{
      File.json_write('./data/plugins/index.json', { index: Object.keys(this.plugins) });
      for(var i of Object.keys(this.plugins)){
        File.json_write(`./data/plugins/${i}.json`, this.plugins[i].json());
      }
      console.log('write!');
    }catch(e){
      console.log(e);
      process.exit(1);
    }
  }
}

module.exports = PluginData;
