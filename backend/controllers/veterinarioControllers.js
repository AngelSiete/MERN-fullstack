import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req,res) => {
    // middleware
    const {email, nombre} = req.body;
    const existeUsuario = await Veterinario.findOne({email});
    if (existeUsuario){
        const error = new Error('email ya en uso');
        return res.status(400).json({msg:error.message})
    }
    // 
    try{
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()
        emailRegistro({
            email,nombre,token: veterinarioGuardado.token
        });
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
    const {veterinario} = req;
    res.json({
        msg: 'Logueado Desde API/veterinarios/perfil',
        profile: veterinario
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
const autenticar = async (req,res) => {
    const {password, email} = req.body;
    const usuarioLogin = await Veterinario.findOne({email})
    if (!usuarioLogin){
        const error = new Error('ese email no está registrado');
        return res.status(403).json({msg:error.message})
    }
    if (!usuarioLogin.confirmado){
        const error = new Error('ese email no está confirmado');
        return res.status(403).json({msg:error.message})
    }
    if (await usuarioLogin.comprobarPassword(password)){
        res.json({
            msg: 'autenticado',
            token: generarJWT(usuarioLogin.id)
        })
    }
}
const resetPassword = async (req,res) => {
    const {email} = req.body;
    const existeVeterinario = await Veterinario.findOne({email})
    if (!existeVeterinario){
        const error = new Error('ese email no está registrado');
        return res.status(403).json({msg:error.message})
    }
    try{
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: 'token creado para resetear contraseña'})
    }catch(err){
        const error = new Error('error accediendo a la base de datos');
        return res.status(403).json({msg:error.message})
    }
}
const comprobarToken = async (req,res) => {
    const {token} = req.params;
    const tokenValido = await Veterinario.findOne({token})
    if (tokenValido){
        res.json({msg:'token válido, resetee su contraseña: '})
    }
    else{
        const error = new Error('ese token no es válido');
        return res.status(403).json({msg:error.message})
    }
}
const nuevoPassword = async (req,res) => {
    const {token} = req.params;
    const {password} = req.body;
    const existeVeterinario = await Veterinario.findOne({token})
    if (!existeVeterinario){
        const error = new Error('ese email no está registrado');
        return res.status(403).json({msg:error.message})
    }
    try{
        existeVeterinario.password = password;
        existeVeterinario.token = null;
        await existeVeterinario.save();
        res.json({
            msg : 'password reseteado con éxito'
        })
    }catch(err){
        const error = new Error('error accediendo a la base de datos');
        return res.status(403).json({msg:error.message})
    }
}
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    resetPassword,
    comprobarToken,
    nuevoPassword}