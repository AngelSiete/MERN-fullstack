import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const {setEdicion} = usePacientes();
    const {email, fecha, nombre, propietario, sintomas, _id} = paciente;
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES',{dateStyle:'long'}).format(nuevaFecha)
    }
    return(
       <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-sm">
        <p className="font-bold uppercase my-2">Nombre: <span className="font-normal normal-case">{nombre}</span></p>
        <p className="font-bold uppercase my-2">propietario: <span className="font-normal normal-case">{propietario}</span></p>
        <p className="font-bold uppercase my-2">email: <span className="font-normal normal-case">{email}</span></p>
        <p className="font-bold uppercase my-2">fecha de alta: <span className="font-normal normal-case">{formatearFecha(fecha)}</span></p>
        <p className="font-bold uppercase my-2">síntomas: <span className="font-normal normal-case">{sintomas}</span></p>
        <p className="font-bold uppercase my-2">id: <span className="font-normal normal-case">{_id}</span></p>
        <div className="flex justify-between my-5">
            <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 uppercase font-bold rounded-md text-white" onClick={() => setEdicion(paciente)}>Editar</button>
            <button type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 uppercase font-bold rounded-md text-white">Eliminar</button>
        </div>
       </div>
    )
}

export default Paciente;