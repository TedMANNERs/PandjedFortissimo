import pg from "pg";
import Config from "../Config.js";

class Database {
  static connect(callback) {
    pg.connect(Config.DatabaseConnectionString(), callback);
  }
}

export default Database;
