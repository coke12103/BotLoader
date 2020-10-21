const App = require('../index.js');

class Server{
  constructor(data){
    this.set(data);
  }

  set(data){
    if(data.id) this.id = data.id;
    if(data.storage && Object.keys(data.storage) && this.storage) Object.assign(this.storage, data.storage);
    else if(data.storage && Object.keys(data.storage)) this.storage = data.storage;
    else this.storage = {};
  }

  set_storage(key, data){
    this.storage[key] = data;
    App.Servers.sync();
  }

  get_storage(key){
    return this.storage[key];
  }

  json(){
    return { id: this.id, storage: this.storage };
  }
}

module.exports = Server;
