import Paciente from "../models/Paciente.js";

const obtenerPaciente = async (req,res) => {
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

export {
    obtenerPaciente,
    agregarPaciente
}