var JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

const driverPath = './drivers/';
const libPath = './lib/drivers/';

if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath([
        driverPath + 'derby.jar',
        driverPath + 'derbyclient.jar',
        driverPath + 'derbytools.jar',
        driverPath + 'hsqldb.jar',
        libPath + 'commons-collections-3.2.1.jar',
        libPath + 'commons-logging-1.1.3.jar',
        libPath + 'commons-configuration-1.6.jar',
        libPath + 'hadoop-common-2.7.3.jar',
        libPath + 'hadoop-auth-2.7.3.jar',
        libPath + 'hadoop-mapreduce-client-core-2.7.3.jar',
        libPath + 'hive-ant-1.2.1.jar',
        libPath + 'hive-beeline-1.2.1.jar',
        libPath + 'hive-cli-1.2.1.jar',
        libPath + 'hive-common-1.2.1.jar',
        libPath + 'hive-contrib-1.2.1.jar',
        libPath + 'hive-exec-1.2.1.jar',
        libPath + 'hive-hbase-handler-1.2.1.jar',
        libPath + 'hive-hwi-1.2.1.jar',
        libPath + 'hive-jdbc-1.2.1.jar',
        libPath + 'hive-metastore-1.2.1.jar',
        libPath + 'hive-serde-1.2.1.jar',
        libPath + 'hive-service-1.2.1.jar',
        libPath + 'hive-shims-0.20S-1.2.1.jar',
        libPath + 'hive-shims-0.23-1.2.1.jar',
        libPath + 'hive-shims-1.2.1.jar',
        libPath + 'hive-shims-common-1.2.1.jar',
        libPath + 'hive-shims-scheduler-1.2.1.jar',
        libPath + 'hive-testutils-1.2.1.jar',
        libPath + 'httpclient-4.4.jar',
        libPath + 'httpcore-4.4.jar',
        libPath + 'libfb303-0.9.2.jar',
        libPath + 'libthrift-0.9.2.jar',
        libPath + 'log4j-1.2.17.jar',
        libPath + 'slf4j-api-1.7.10.jar',
        libPath + 'slf4j-log4j12-1.7.10.jar'
    ]);
}

var config = {
    url: 'jdbc:hive2://localhost:10000/i072179;user=i072179;password=Zzfan_54142306',
    minpoolsize: 10,
    maxpoolsize: 100
};

var hsqldb = new JDBC(config);

hsqldb.initialize(function (err) {
    if (err) {
        console.error(err);
    }
});

hsqldb.reserve(function (err, connObj) {
    console.log("Using connection: " + connObj.uuid);
    var conn = connObj.conn;
    conn.createStatement(function (err, statement) {
        statement.executeUpdate("insert into i072179.employee values (2, 'Kevin', '10000', 'Shanghai')",
            function (err, count) {
                if (err) {
                    console.error(err)
                } else {
                    console.log(count)
                }
            });
        ;
    });
});

module.exports = hsqldb;
