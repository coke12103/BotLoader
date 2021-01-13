const fs = require('fs');
const path = require('path');

const App = require('./index');

const PL_DIR = './plugins/';

class Loader{
  static load(){
    var plugins = [];

    try{
      var file_list = fs.readdirSync(PL_DIR);

      for(var file of file_list) {
        if(file.startsWith('.git')) continue;

        try{
          var index = file;

          if(fs.statSync(path.join(PL_DIR, index)).isDirectory()) index = path.join(index, "index.js");

          var pl = require(path.relative(__dirname, path.join(PL_DIR, index)));
          var plugin = new pl();
          plugins.push(plugin);

          console.log(plugin.name, "loaded!");
        }catch(e){
          console.log(e);
        }
      }
    }catch(e){
      console.log(e);
      process.exit(1);
    }

    return plugins;
  }
}

module.exports = Loader;
