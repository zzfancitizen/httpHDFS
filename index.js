const http = require("http");
const hsqldb = require("./hive-jdbc");
const asyncjs = require("async");

let server = http.createServer().listen(process.env.PORT || 3000);

server.on('request', (req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body = chunk.toString('utf8');
        });
        req.on('end', () => {
            let myRow = JSON.parse(body);
            let sql = "insert into i072179.employee" + " values(" + myRow.id + ", '" + myRow.name + "', '" + myRow.salary + "', '" + myRow.destination + "')".toString();
            hsqldb.reserve((err, connObj) => {
                if (connObj) {
                    console.log("Using connection: " + connObj.uuid);
                    let conn = connObj.conn;
                    conn.createStatement((err, statement) => {
                        statement.executeUpdate(sql,
                            (err, count) => {
                                console.log(err)
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