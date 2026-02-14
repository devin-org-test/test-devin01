const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(":memory:");

function getUserByName(username) {
  db.all(
    "SELECT * FROM users WHERE username = '" + username + "'",
    (err, rows) => {
      return rows;
    }
  );
}
