import Database from "../database/Database.js";

class TrackTagRepository {
  getTrackIdsByTagId(id, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("SELECT track_id FROM track_tag where tag_id=$1", [id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows);
      });
    });
  }

  getTagIdsByTrackId(id, callback) {
    Database.connect((err, client, done) => {
      if (err) {
        return console.error("error fetching client from pool", err);
      }

      return client.query("SELECT tag_id FROM track_tag where track_id=$1", [id], (queryErr, result) => {
        done();
        if (queryErr) {
          return console.error("error running query", queryErr);
        }

        return callback(result.rows);
      });
    });
  }
}

export default TrackTagRepository;
