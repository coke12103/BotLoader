const fs = require('fs');

class Loader{
  static load(){
    var plugins = [];

    try{
      var file_list = fs.readdirSync('./plugins/');

      for(var file of file_list) {
        var pl = require('../plugins/' + file);
        plugins.push(new pl());
      }
    }catch(e){
      console.log(e);
      process.exit(1);
    }

    return plugins;
  }
}

module.exports = Loader;
