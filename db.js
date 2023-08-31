const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // port: "3306",
  user: "root",
  password: "rey123@",
  database: "mile_2",
});

db.connect((err) => {
  if (err) {
    console.log("Error Connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
