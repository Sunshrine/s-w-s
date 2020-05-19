module.exports = {

getGuild(guild, key, defVal) {
    const settings = this.guildSettings.get(this.constructor.getGuildID(guild));

    if (!key && !defVal) {
      return settings;
    }

    return settings ? typeof settings[key] === 'undefined' ? defVal : settings[key] : defVal;
  }
}