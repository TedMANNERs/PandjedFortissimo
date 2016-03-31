import Database from "../database/Database.js";

class TrackRepository {
  getAll(callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("SELECT * FROM track", (queryErr, result) => {
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

      return client.query("SELECT * FROM track where id=$1", [id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows);
      });
    });
  }
}

export default TrackRepository;
