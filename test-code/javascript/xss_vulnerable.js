const http = require("http");
const url = require("url");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const name = parsedUrl.query.name;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<html><body><h1>Hello " + name + "</h1></body></html>");
}

function renderSearchResults(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query.q;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    '<html><body><div>Search results for: ' +
      query +
      "</div></body></html>"
  );
}

function displayComment(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<html><body><div>" + body + "</div></body></html>");
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/greet") {
    handleRequest(req, res);
  } else if (parsedUrl.pathname === "/search") {
    renderSearchResults(req, res);
  } else if (parsedUrl.pathname === "/comment") {
    displayComment(req, res);
  }
});

server.listen(3000);
