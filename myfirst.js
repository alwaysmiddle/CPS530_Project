var http = require('http');
var url = require('url');
var dt = require('./myfirstmodule')

http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  var a = query.a;
  var b = query.b;
  var result = a * b;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end('<h1>Hello World! Result: </h1>'+result);


  console.log('kekw')
}).listen(8080); 