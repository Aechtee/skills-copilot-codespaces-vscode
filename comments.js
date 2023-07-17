// Create Web Server
// Run: node comments.js
// Access: http://localhost:3000/comments
// Comments: http://localhost:3000/comments?name=John&comment=Hello
// Comments: http://localhost:3000/comments?name=John&comment=Hello&delete=1

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log(filename);
  if (filename == './comments') {
    var qdata = q.query;
    console.log(qdata);
    if (qdata.name && qdata.comment) {
      fs.appendFile('comments.txt', qdata.name + ' ' + qdata.comment + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    if (qdata.delete) {
      fs.writeFile('comments.txt', '', function (err) {
        if (err) throw err;
        console.log('Deleted!');
      });
    }
    fs.readFile('comments.txt', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="comments">');
      res.write('Name: <input type="text" name="name"><br>');
      res.write('Comment: <input type="text" name="comment"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      res.write('<br>');
      res.write('<a href="comments?delete=1">Delete</a>');
      res.write('<br>');
      res.write('<br>');
      res.write('Comments:');
      res.write('<br>');
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(3000);