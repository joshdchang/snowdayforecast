
// Get modules
const http = require('http');
const url = require('url');
const mysql = require('mysql');

// Log into my Gearhost database
var con = mysql.createConnection({
    host: 'den1.mysql2.gear.host',
    database : 'modelanalysis',
    user: 'modelanalysis',
    password: 'Lu0sKdvnz!m-'
});

// Open server to respond to http requests by static site
http.createServer(function (req, res) {
    
    // Parse url
    var q = url.parse(req.url, true);
    var zip = q.query.zip;

    // Contact database
    var response = {};
    con.query("SELECT * FROM metadata", function (err, result) {
        response.metadata = result[0];
    });
    con.query("SELECT * FROM zipdata WHERE zip = ?", [zip], function (err, result) {
        response.zipdata = result[0];

        // Send results
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(response));
    });
}).listen(8080);