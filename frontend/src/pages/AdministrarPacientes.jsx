import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleButtonFormulario = () => {
    setMostrarFormulario(prevCheck => !prevCheck)
  }
  
  return (
    <div className="flex flex-col md:flex-row">
      <button type="button" className="bg-indigo-600 text-white uppercase font-bold mx-10 p-3 rounded-md md:hidden" onClick={handleButtonFormulario}>{!mostrarFormulario ? 'Mostrar Formulario' : 'Ocultar Formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario></Formulario>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes></ListadoPacientes>
      </div>
    </div>
  );
};
export default AdministrarPacientes;
