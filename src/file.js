const fs = require('fs');

class File{
  constructor(){};

  static exist_check(path){
    var exist = false;

    try{
      fs.statSync(path);
      exist = true;
    }catch(e){}

    return exist;
  }

  static load(path, is_binaly = false){
    var file = null;

    if(this.exist_check(path)){
      if(is_binaly) file = fs.readFileSync(path, 'utf8');
      else file = fs.readFileSync(path);
    }else{
      console.log("File Not Found.: " + path);
    }

    return file;
  }

  static mkdir(path){
    try{
      fs.mkdirSync(path, { recursive: true });
    }catch(e){
      throw e;
    }

    return;
  }

  static json_write(path, data){
    try{
      fs.writeFileSync(path, JSON.stringify(data, null, " "));
    }catch(e){
      throw e;
    }
  }

  static bin_write(path, data){
    try{
      fs.writeFileSync(path, data);
    }catch(e){
      throw e;
    }
  }
}

module.exports = File;
