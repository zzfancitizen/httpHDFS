var http = require("http");
var hsqldb = require("./hive-jdbc");

var server = http.createServer().listen(process.env.PORT || 3000);

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (chunk) {
            body = chunk.toString('utf8');
        });
        req.on('end', function () {
            var myRow = JSON.parse(body);
            var sql = "insert into i072179.employee" + " values(" + myRow.id + ", '" + myRow.name + "', '" + myRow.salary + "', '" + myRow.destination + "')".toString();
            hsqldb.reserve(function (err, connObj) {
                if (connObj) {
                    console.log("Using connection: " + connObj.uuid);
                    var conn = connObj.conn;
                    conn.createStatement(function (err, statement) {
                        statement.executeUpdate(sql,
                            function (err, count) {
                                if (err) {
                                    res.statusCode = 500;
                                    res.write(err);
                                    res.end();
                                } else {
                                    res.statusCode = 200;
                                    res.write('Insert' + count + 'of value successful');
                                    res.end();
                                }
                            });
                    });
                }
            });
        })
    }
    if (req.method == 'GET') {
        res.write('no get handler');
        res.end();
    }
})