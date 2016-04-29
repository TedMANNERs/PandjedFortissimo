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

        return callback(result.rows[0]);
      });
    });
  }

  insert(tag, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("INSERT INTO tag(name) VALUES ($1) RETURNING id", [tag.name], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows[0].id);
      });
    });
  }

  update(tag, id, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("UPDATE tag SET name=$1 WHERE id=$2 RETURNING id", [tag.name, id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        if (result.rowCount === 0) {
          return callback(null);
        }

        return callback(result.rows[0].id);
      });
    });
  }

  delete(id, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("DELETE FROM tag WHERE id=$1 RETURNING id", [id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        if (result.rowCount === 0) {
          return callback(null);
        }

        return callback(result.rows[0].id);
      });
    });
  }
}

export default TagRepository;
