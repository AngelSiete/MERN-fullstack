import Paciente from "../models/Paciente.js";

const obtenerPacientes = async (req,res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
    res.json({pacientes})
}

const agregarPaciente = async (req,res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try{
        const pacienteGuardado = await paciente.save();
        res.json({msg:'paciente añadido con éxito', paciente:pacienteGuardado })
    }catch(err){
        const error = new Error('error accediendo a pacientes');
        return res.status(400).json({msg:error.message})
    }
}

const obtenerPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(400).json({msg:'acción no válida'})
    }
    if (paciente){
        res.json({
            paciente
        })
    }
}

const actualizarPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    if(!paciente){
        res.status(404).json({msg:'paciente no encontrado'})
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(400).json({msg:'acción no válida'})
    }
    // actualizamos paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try{
        const pacienteActualizado = await paciente.save();
        res.json({msg:'éxito al actualizar', pacienteActualizado})
    }catch(err){
        const error = new Error('error accediendo a pacientes');
        return res.status(400).json({msg:error.message})
    }
}

const eliminarPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    if(!paciente){
        res.status(404).json({msg:'paciente no encontrado'})
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(400).json({msg:'acción no válida'})
    }
    try{
        await paciente.deleteOne();
        res.json({msg:'paciente eliminado con éxito'})
    }catch(err){
        const error = new Error('error accediendo a pacientes');
        return res.status(400).json({msg:error.message})
    }
}

export {
    obtenerPacientes,
    obtenerPaciente,
    agregarPaciente,
    actualizarPaciente,
    eliminarPaciente
}