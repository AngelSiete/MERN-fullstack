import express from "express";
import * as dotenv from "dotenv"
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

conectarDB();

const dominiosPermitidos = process.env.FRONTEND_URL;
const corsOptions = {
    origin : function(origin,callback){
        if (dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('unrestricted access'))
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`funciona en ${process.env.PORT}`)
});