import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';

const ListadoPacientes = () => {
    const {pacientes} = usePacientes();

    return (
        <>
        <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
        {pacientes.map(paciente => (
            <Paciente key={paciente._id} paciente={paciente}/>
        ))}
        </>
    )
}

export default ListadoPacientes;