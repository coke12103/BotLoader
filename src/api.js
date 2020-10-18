const DiscordJS = require('discord.js');

class Discord extends DiscordJS.Client{
  constructor(){
    super();
  }
}

module.exports = Discord;
