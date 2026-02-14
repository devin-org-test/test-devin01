const { exec, execSync } = require("child_process");
const http = require("http");
const url = require("url");

function pingHost(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const host = parsedUrl.query.host;

  exec("ping -c 1 " + host, (error, stdout) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(stdout || error.message);
  });
}

function lookupDns(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const domain = parsedUrl.query.domain;

  const result = execSync("nslookup " + domain);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(result.toString());
}

function listDirectory(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const dir = parsedUrl.query.dir;

  exec("ls -la " + dir, (error, stdout) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(stdout || error.message);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/ping") {
    pingHost(req, res);
  } else if (parsedUrl.pathname === "/dns") {
    lookupDns(req, res);
  } else if (parsedUrl.pathname === "/ls") {
    listDirectory(req, res);
  }
});

server.listen(3001);
