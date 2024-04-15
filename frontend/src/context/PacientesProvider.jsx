import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientes,setPacientes] = useState([]);
    useEffect(()=>{
        const obtenerPacientes = async () => {
            try{
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config )
                setPacientes(data.pacientes)
            }catch(err){
                console.log(err)
            }
        }
        obtenerPacientes();
    },[])

    const guardarPaciente = async (paciente) => {
        try{
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/pacientes',paciente, config )
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
            setPacientes([pacienteAlmacenado, ...pacientes])
        }catch(err){
            console.log(err.response.data.msg)
            return 
        }
    }
  return (
    <PacientesContext.Provider value={{pacientes, guardarPaciente}}>{children}</PacientesContext.Provider>
  );
};

export default PacientesContext;
