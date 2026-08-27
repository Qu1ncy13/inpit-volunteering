import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";

import { events } from "./database/events.js";
import db from "./database/db.js";


const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: "top-secret",
    resave: false,
    saveUninitialized: false
}));

const PORT = 3000;


app.get("/events", (req, res) =>{
    res.json(events);
});

app.get("/me", (req, res) =>{
    
    const userId = req.session.userId;

    if (!userId){
        return res.status(401).json({
            message: "Пользователь не авторизован"
        });
    }

    const user = db.prepare(`
        SELECT id, name, email, role
        FROM users
        WHERE id = ?
    `).get(userId);

    
    
    if (!user){
        return res.status(401).json({
            message: "Пользователь не найден"
        });
    }
    res.json({user});

});
app.post("/login", async (req, res) =>{
    

    const {email, password} = req.body;
    
    // проверки пустоты input и их типов данных
    if (typeof email !== "string" ||  email.trim() === ""){
        return res.status(400).json({
            message: "Некорректный email"
        });
    }

    if (typeof password !== "string" || password.trim() === ""){
        return res.status(401).json({
            message: "Некорректный пароль"
        });
    }
    const cleanEmail = email.trim();
    //
    const user = db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
    `).get(cleanEmail);

    
    
    if (user === undefined){
        return res.status(400).json({
            message: "Пользователь не найден"
        });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    console.log("passwordMatched:", passwordMatched);
    
    if (!passwordMatched){
        return res.status(401).json({
            message: "Неверный пароль"
        });
    }
    // после всех проверок вход выполнен
    req.session.userId = user.id;

    res.json({
        message: "Вход выполнен",
        user: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    });
    

})
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
