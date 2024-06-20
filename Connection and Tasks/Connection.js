const mysql = require("mysql");

const app = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sk9Qr5y8",
    database: "blogplatform",
});

module.exports = app;
