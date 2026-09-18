const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitforConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
        return;
    }
    console.log("✅ MySQL connected");
});
db.on("error", (err) => {
    console.error("❌ MySQL connection error:", err.code, err.message);
    if (err.code === "ECONNRESET") {
        console.error("MySQL connection was reset.");
    }
});

module.exports = db;