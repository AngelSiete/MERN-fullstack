import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const pacienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim:true
    },
    propietario:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    fecha:{
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        required: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    },
},
{
    timestamps: true
});

pacienteSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

pacienteSchema.methods.comprobarPassword = async function(passFormulario){
    return await bcrypt.compare(passFormulario, this.password)
}

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;