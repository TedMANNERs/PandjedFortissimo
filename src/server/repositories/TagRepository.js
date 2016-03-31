import Database from "../database/Database.js";

class TagRepository {
  getAll(callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("SELECT * FROM tag", (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows);
      });
    });
  }

  getById(id, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("SELECT * FROM tag where id=$1", [id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows);
      });
    });
  }
}

export default TagRepository;
