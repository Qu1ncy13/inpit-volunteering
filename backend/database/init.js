import db from "./db.js";

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
    );
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    );
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    place TEXT NOT NULL,
    type_id INTEGER NOT NULL,
    created_by INTEGER NOT NULL,

    FOREIGN KEY (type_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
    );
`);





