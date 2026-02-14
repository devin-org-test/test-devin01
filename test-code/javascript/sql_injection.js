const sqlite3 = require("sqlite3");
const http = require("http");

const db = new sqlite3.Database(":memory:");

function getUserByName(username) {
  db.all(
    "SELECT * FROM users WHERE username = ?",
      [username],
    (err, rows) => {
      return rows;
    }
  );
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  getUserByName(url.searchParams.get("username"));
});
