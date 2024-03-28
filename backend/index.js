import express from "express";
import * as dotenv from "dotenv"
import conectarDB from "./config/db.js";
dotenv.config();

const app = express();

conectarDB();

app.use('/', (req,res) => {
    res.send('')
})

app.listen(process.env.PORT, () =>{
    console.log(`funciona en ${process.env.PORT}`)
});