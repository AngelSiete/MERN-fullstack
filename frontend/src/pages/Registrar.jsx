import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
export default function Registrar() {
  const [valoresRegistro, setValoresRegistro] = useState({
    nombre: "",
    email: "",
    password: "",
    repetirpassword: "",
  });
  const [alerta, setAlerta] = useState({});
  function handleChangeInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setValoresRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (valoresRegistro.password !== valoresRegistro.repetirpassword) {
      setAlerta({ msg: "Los Password no son iguales", error: true });
      return;
    }
    if (valoresRegistro.password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = "http://localhost:4000/api/veterinarios";
      const respuesta = await axios.post(url, valoresRegistro);
      if (respuesta.status == 200) {
        setValoresRegistro({});
        setAlerta({
          msg: "Creado Correctamente, revisa tu email",
          error: false,
        });
      }
    } catch (err) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Regístrate y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="nombre"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              name="nombre"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="email"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              name="email"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              name="password"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="repetirpassword"
            >
              Repetir password
            </label>
            <input
              type="password"
              placeholder="repetir password"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              name="repetirpassword"
              required
              onChange={handleChangeInput}
            />
          </div>
          <input
            type="submit"
            value="Crea tu cuenta"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 md:w-auto md:px-10 lg:flex lg:mx-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6"
            to="/"
          >
            Inicia sesión
          </Link>
          <Link
            className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6"
            to="/olvidepassword"
          >
            Olvidé contraseña
          </Link>
        </nav>
      </div>
    </>
  );
}
