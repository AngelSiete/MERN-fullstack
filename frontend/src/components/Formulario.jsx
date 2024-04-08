import { useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [valoresFormulario, setValoresFormulario] = useState({
    nombre: "",
    propietario: "",
    email:"",
    fecha:"",
    sintomas:""
  });

  const {guardarPaciente} = usePacientes();

  function handleChangeInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setValoresFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSubmit(e){
    e.preventDefault();
    setAlerta({})
    guardarPaciente(valoresFormulario)
  }
  const [alerta, setAlerta] = useState({})
  const {msg} = alerta;
  return (
    <>
      <p className="text-lg text-center mb-10">
        Añade tus pacientes y adminístralos
      </p>
      {msg && <Alerta alerta={alerta}/>}
      <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="mascota" className="uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="mascota"
            name="nombre"
            placeholder="nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChangeInput}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="uppercase font-bold">
            Nombre propietario/a
          </label>
          <input
            type="text"
            id="propietario"
            name="propietario"
            placeholder="nombre del propietario/a"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChangeInput}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="uppercase font-bold">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChangeInput}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="uppercase font-bold">
            Fecha de Alta
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha de Alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChangeInput}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            name="sintomas"
            placeholder="Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChangeInput}
          />
        </div>
        <input
          type="submit"
          value="Agregar paciente"
          className="bg-indigo-600 text-white p-4 w-full uppercase font-bold hover:bg-indigo-700 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Formulario;
