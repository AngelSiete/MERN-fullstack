import express from "express";
import * as dotenv from "dotenv"
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

conectarDB();

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`funciona en ${process.env.PORT}`)
});