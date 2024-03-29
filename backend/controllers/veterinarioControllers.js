import Veterinario from "../models/Veterinario.js";

const registrar = async (req,res) => {
    // middleware
    const {email} = req.body;
    const existeUsuario = await Veterinario.findOne({email});
    if (existeUsuario){
        const error = new Error('email ya en uso');
        return res.status(400).json({msg:error.message})
    }
    // 
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
const confirmar = async (req,res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token})
    if (!usuarioConfirmar){
        const error = new Error('token no válido');
        return res.status(400).json({msg:error.message})
    }
    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save();
        res.json({
            msg: 'usuario confirmado con token',
        })
    }catch(err){
        res.json({
            msg: err.message,
            params: req.body,
        })
    }
}
export {
    registrar,
    perfil,
    confirmar
}