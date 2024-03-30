import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            )
            console.log('todo cool')
            return next();
        }catch(err){
            const e = new Error ('token no válido incluido')
            return res.status(403).json({msg: e.message})
        }
    }
    if (!token){
        const error = new Error ('sin token válido incluido')
        res.status(403).json({msg: error.message})
    }
    next();
}

export default checkAuth;