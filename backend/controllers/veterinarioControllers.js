import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
  // middleware
  const { email, nombre } = req.body;
  const existeUsuario = await Veterinario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("email ya en uso");
    return res.status(400).json({ msg: error.message });
  }
  //
  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });
    res.json({
      msg: "Desde API/veterinarios/ veterinario guardado con éxito",
      vet: veterinarioGuardado,
    });
  } catch (err) {
    res.json({
      msg: err.message,
      params: req.body,
    });
  }
};
const perfil = (req, res) => {
  const { veterinario } = req;
  res.json({
    msg: "Logueado Desde API/veterinarios/perfil",
    profile: veterinario,
  });
};
const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("token no válido");
    return res.status(400).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({
      msg: "usuario confirmado con token",
    });
  } catch (err) {
    res.json({
      msg: err.message,
      params: req.body,
    });
  }
};
const autenticar = async (req, res) => {
  const { password, email } = req.body;
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("ese email no está registrado");
    return res.status(403).json({ msg: error.message });
  }
  if (!usuario.confirmado) {
    const error = new Error("ese email no está confirmado");
    return res.status(403).json({ msg: error.message });
  }
  if (await usuario.comprobarPassword(password)) {
    usuario.token = generarJWT(usuario.id)
    res.json( {_id : usuario._id, nombre: usuario.nombre, email:usuario.email,token:usuario.token});
  }
};
const resetPassword = async (req, res) => {
  const { email } = req.body;
  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("ese email no está registrado");
    return res.status(403).json({ msg: error.message });
  }
  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });
    res.json({ msg: "token creado para resetear contraseña" });
  } catch (err) {
    const error = new Error("error accediendo a la base de datos");
    return res.status(403).json({ msg: error.message });
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Veterinario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "token válido, resetee su contraseña: " });
  } else {
    const error = new Error("ese token no es válido");
    return res.status(403).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const existeVeterinario = await Veterinario.findOne({ token });
  if (!existeVeterinario) {
    const error = new Error("ese email no está registrado");
    return res.status(403).json({ msg: error.message });
  }
  try {
    existeVeterinario.password = password;
    existeVeterinario.token = null;
    await existeVeterinario.save();
    res.json({
      msg: "password reseteado con éxito",
    });
  } catch (err) {
    const error = new Error("error accediendo a la base de datos");
    return res.status(403).json({ msg: error.message });
  }
};
const actualizarPerfil = async (req,res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  console.log(veterinario)
  if (!veterinario){
    const error = new Error('no existe dicho veterinario')
    return res.status(400).jsxon({msg:error.message})
  }
  try{
    veterinario.nombre = req.body.nombre || veterinario.nombre;
    veterinario.email = req.body.email || veterinario.email;
    veterinario.web = req.body.web || veterinario.web;
    veterinario.telefono = req.body.telefono || veterinario.telefono;
    const vetActualizado = await veterinario.save();
    res.json(vetActualizado);
  }catch(err){
    console.log(err)
  }
}
const actualizarPassword = async(req,res) => {
  const {id} = req.veterinario
  const {pwd_actual, pwd_nuevo} = req.body
  const veterinario = await Veterinario.findById(id);
  if (!veterinario){
    const error = new Error('no existe dicho veterinario')
    return res.status(400).jsxon({msg:error.message})
  }
  if (await veterinario.comprobarPassword(pwd_actual)){
    veterinario.password = pwd_nuevo;
    await veterinario.save();
    res.json({msg:'password cambiado correctamente'})
  }else{
    const error = new Error('el password actual es incorrecto')
    return res.status(400).jsxon({msg:error.message})
  }
}
export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
};
