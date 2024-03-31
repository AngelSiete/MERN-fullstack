import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

export default function Registrar(){
    const [valoresRegistro, setValoresRegistro] = useState({
        email: '',
        password: '',
        repetirpassword: ''
    })
    const [hayErrores, setHayErrores] = useState({})
    function handleChangeInput(e){
        const {name, value} = e.target;
        setValoresRegistro((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }
    function handleSubmit(e){
        e.preventDefault();
        if (valoresRegistro.password !== valoresRegistro.repetirpassword){
            setHayErrores((prevState) =>({
                ...prevState,
                msg: 'las contraseñas deben ser iguales',
                error:true
            }))
        }
        if (valoresRegistro.password.length < 8){
            setHayErrores((prevState) =>({
                ...prevState,
                msg: 'lacontraseña es muy corta',
                error:true
            }))
        }
    }
    return (
        <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Regístrate y administra tus{" "}
              <span className="text-black">pacientes</span>
            </h1>
          </div>
          <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
            <form onSubmit={handleSubmit}>
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
                  name='email'
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
                  name='password'
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
                  name='repetirpassword'
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
              <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6" to="/">Inicia sesión</Link>
              <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6" to="/olvidepassword">Olvidé contraseña</Link>
            </nav>
            {hayErrores && <Alerta alerta={hayErrores}/>}
          </div>
        </>
      );
}