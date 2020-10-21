const File = require('./file.js');
const Server = require('./models/server.js');

class ServerData{
  constructor(){
    if(!File.exist_check('./data/servers')) File.mkdir('./data/servers');

    this.servers = {};

    if(!File.exist_check('./data/servers/index.json')) File.json_write('./data/servers/index.json', { index: [] });

    try{
      var index = JSON.parse(File.load('./data/servers/index.json')).index;

      for(var i of index){
        this.servers[i] = new Server(JSON.parse(File.load(`./data/servers/${i}.json`)));
      }
    }catch(e){
      console.log(e);
      process.exit(1);
    }
  }

  get(id){
    if(!this.servers[id]) this.set(id, { id: id, storage: {} });

    return this.servers[id];
  }

  set(id, data){
    if(!this.servers[id]) this.servers[id] = new Server(data);
    else this.servers[id].set(data);

    this.sync();
  }

  sync(){
    try{
      File.json_write('./data/servers/index.json', { index: Object.keys(this.servers) });
      for(var i of Object.keys(this.servers)){
        File.json_write(`./data/servers/${i}.json`, this.servers[i].json());
      }
      console.log('write!');
    }catch(e){
      console.log(e);
      process.exit(1);
    }
  }
}

module.exports = ServerData;
