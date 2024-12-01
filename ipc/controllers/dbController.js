const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('logs.db', (err) => {
    if (err) {
        return console.error("Error opening database:", err.message);
    }
    console.info("DB CONNECTION: Successful");
});

db.run("PRAGMA journal_mode=WAL");

db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        contact_name INTEGER,
        contact_pub_key TEXT,
        contact_id TEXT,
        protocol TEXT
    )
`);

exports.update = (data) => {
    db.run("INSERT INTO logs (id, date, host, message, protocol) VALUES (?, ?, ?, ?, ?)", [
        data.id,
        data.date,
        data.host,
        data.message,
        data.protocol
    ], (err) => {
        if (err) throw err;
    })
}

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});