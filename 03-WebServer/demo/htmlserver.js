var http = require("http");
var fs = require("fs"); //Importamos el módulo fs que nos permite leer y escribir archivos del file system

http
  .createServer(function (req, res) {
    if (req.url === "/posts") {
      res.writeHead(200, { "content-Type": "text/html" });
      res.end("Estos son los posts");
    } else if (req.url === "/html") {
      res.writeHead(200, { "Content-Type": "text/html" });
      var html = fs.readFileSync(__dirname + "/html/index.html");
      res.end(html);
    } else if (req.url === "/json") {
      res.writeHead(200, { "Content-Type": "application/json" });

      var obj = {
        nombre: "Juan",
        apellido: "Perez",
      };
      res.end(JSON.stringify(obj)); // stringfy convierte el JSON en string
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Esta es la ruta general");
    }
  })
  .listen(1337, "127.0.0.1");
