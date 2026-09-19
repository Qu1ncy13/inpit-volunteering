import db from "./db.js";
const script = db.prepare(`
    DELETE FROM events
       
`)
script.run();