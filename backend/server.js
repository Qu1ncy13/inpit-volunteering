import express from "express";
import cors from "cors";
import { events } from "./database/events.js";

const app = express();
app.use(cors());


const PORT = 3000;


app.get("/events", (req, res) =>{
    res.json(events);
});

app.listen(PORT, () =>{
    console.log(`server is ready port: ${PORT}`);
});