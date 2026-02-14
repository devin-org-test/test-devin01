const http = require("http");
const url = require("url");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)"
);

function getUserByName(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const username = parsedUrl.query.username;

  db.all(
    "SELECT * FROM users WHERE username = '" + username + "'",
    (err, rows) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(rows || []));
    }
  );
}

function loginUser(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { username, password } = JSON.parse(body);
    db.get(
      "SELECT * FROM users WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, row) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(row || { error: "Invalid credentials" }));
      }
    );
  });
}

function searchUsers(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const term = parsedUrl.query.q;

  db.all(
    "SELECT username, email FROM users WHERE username LIKE '%" + term + "%'",
    (err, rows) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(rows || []));
    }
  );
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/user") {
    getUserByName(req, res);
  } else if (parsedUrl.pathname === "/login") {
    loginUser(req, res);
  } else if (parsedUrl.pathname === "/search") {
    searchUsers(req, res);
  }
});

server.listen(3002);
