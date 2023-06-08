const mysql = require('mysql');

const dbtv = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tourtravel'
});

dbtv.connect(function(err){
    if(err){
        throw new Error("Không thể kết nối tới CSDL demo_nodejs");
    }
});

module.exports = dbtv;