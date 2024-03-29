import Veterinario from "../models/Veterinario.js";

const registrar = async (req,res) => {
    // const {email, password, nombre} = req.body;
    try{
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()
        res.json({
            msg: 'Desde API/veterinarios/ veterinario guardado con éxito',
            vet: veterinarioGuardado
        })
    }catch(err){
        res.json({
            msg: err.message,
            params: req.body,
        })
    }
};
const perfil = (req,res) => {
    res.json({
        msg: 'Desde API/veterinarios/perfil'
    })
};
export {
    registrar,
    perfil
}