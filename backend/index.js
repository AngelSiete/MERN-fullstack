import express from "express";
import * as dotenv from "dotenv"
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

dotenv.config();

const app = express();

conectarDB();

app.use('/api/veterinarios', veterinarioRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`funciona en ${process.env.PORT}`)
});