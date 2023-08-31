const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "containers-us-west-37.railway.app",
  port: "6436",
  user: "root",
  password: "zWEjz2AVH9djmrYBTocx",
  database: "railway",
});

db.connect((err) => {
  if (err) {
    console.log("Error Connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
