const jshs2 = require('jshs2');
const HS2Util = jshs2.HS2Util;
const IDLContainer = jshs2.IDLContainer;
const HiveConnection = jshs2.HiveConnection;
const Configuration = jshs2.Configuration;

const options = {
    auth: 'NOSASL',
    host: 'localhost',            // HiveServer2 hostname
    port: '10000',                     // HiveServer2 port
    username: 'i072179',           			 // HiveServer2 user
    password: '',          // HiveServer2 password
    hiveType: HS2Util.HIVE_TYPE.HIVE,  // HiveServer2 type, (Hive or CDH Hive)
    hiveVer: '1.2.1',                  // HiveServer2 Version
    thriftVer: '0.9.2',                // Thrift version at IDL Compile time
};

const configuration = new Configuration(options);
const idl = new IDLContainer();

idl.initialize(configuration).then(() => {
    let connection = new HiveConnection(configuration, idl);
    // let serviceType = idl.serviceType;
    // console.log(connection);
    // console.log(serviceType);
    connection.connect().then((cursor) => {
        cursor.execute('SHOW TABLES').then((err, result) => {
            console.log('check if run this part');
            console.log(err);
            console.log(result);
        })
    }).catch((err) => {
        console.error(err)
    })

}).catch((err) => {
    console.error(err);
});

