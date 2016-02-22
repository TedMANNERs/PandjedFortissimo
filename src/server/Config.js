const mainConfig = require(`${__dirname}/config.json`);

class Config {
  static ServerPort() {
    return mainConfig.server.port;
  }
}

export default Config;
