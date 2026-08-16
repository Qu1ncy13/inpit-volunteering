import { events } from "./database/events.js";

import express from "express";
import cors from "cors";
import db from "./database/db.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());

app.use(express.json());


const PORT = 3000;


app.get("/events", (req, res) =>{
    res.json(events);
});

app.post("/register", async (req, res) =>{
    const {name, email, password, study_group} = req.body;
    
    // Проверки имени
    if (typeof name !== 'string') {
        return res.status(400).json({
            message: "Некорректное имя"
        });
    }

    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 100){
        return res.status(400).json({
            message: "Некорректное имя"
        });
    }
    
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(cleanName)){
        return res.status(400).json({
            message: "Некорректное имя"
        });
    }
    
    // проверки email

    if (typeof email !== 'string' || email.trim() === ''){
        return res.status(400).json({
            message: "Некорректный email"
        });
    }
    if (email.trim().length > 100){
        return res.status(400).json({
            message: "Некорректный email"
        });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({
            message: "Некорректный email"
        });
    }  
    // проверки пароля
    if (typeof password !== 'string' || password.length < 8 || password.length > 100){
        return res.status(400).json({
            message: "Некорректный пароль"
        });
    }
    if (!/^\S+$/.test(password)) {
        return res.status(400).json({
            message: "Пароль не должен содержать пробелы"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 12);


    
    try {
        const stmt = db.prepare(`
            INSERT INTO users (name, email, password, study_group)
            VALUES (?, ?, ?, ?)    
        `);
        stmt.run(cleanName, email, hashedPassword, study_group);
        res.json({message: "Данные получены"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
    
    
})

app.listen(PORT, () =>{
    console.log(`server is ready port: ${PORT}`);
});
