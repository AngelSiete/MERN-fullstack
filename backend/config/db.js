import mongoose from "mongoose";

const conectarDB = async()=>{
    try{
        const db = await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        const url = `${db.connection.host}:${db.connection.port}`
        console.log('mongoDB CONECTADO en :', url)
    }catch(err){
        console.log(err.message);
        process.exit(1)
    }
}

export default conectarDB;