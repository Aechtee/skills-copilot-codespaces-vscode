// Create Web Server
// Run: node comments.js
// View at: http://localhost:8080

var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var comments = [];

http.createServer(function(req, res) {
    // Parse URL
    var pathname = url.parse(req.url).pathname;

    // If request is for favicon.ico, return 404
    if (pathname === '/favicon.ico') {
        return;
    }

    // If request is to add comment, get query string
    var query = url.parse(req.url).query;

    // If query string exists, add comment
    if (query) {
        var comment = querystring.parse(query)['comment'];
        comments.push(comment);
    }

    // Write HTML
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<html><head><title>Comments</title></head><body>');
    res.write('<h1>Comments</h1>');

    // Write comments
    for (var i = 0; i < comments.length; i++) {
        res.write('<p>' + comments[i] + '</p>');
    }

    // Write form
    res.write('<form action="/" method="get">');
    res.write('<input type="text" name="comment">');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');

    res.write('</body></html>');
    res.end();
}).listen(8080);