const mainConfig = require(`${__dirname}/config.json`);

class Config {
  static DatabaseConnectionString() {
    const config = mainConfig.database;
    return `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

  static ServerPort() {
    return mainConfig.server.port;
  }
}

export default Config;
