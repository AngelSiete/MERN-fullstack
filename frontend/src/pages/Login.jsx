import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

export default function Login() {
  const {setAuth} = useAuth();
  const [alerta,setAlerta] = useState({})
  const [valoresLogin, setValoresLogin] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate()
  function handleChangeInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setValoresLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const {data} = await clienteAxios.post('/veterinarios/login', valoresLogin)
      console.log(data)
        localStorage.setItem('token',data.token)
        setAuth(data)
        setAlerta({
          msg: 'iniciaste sesión correctamente',
          error:false
        })
        navigate('/admin')
    }catch(err){
      setAlerta({
        msg: err.response.data.msg,
        error:true
      })
    }
  }
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesión y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}
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
              name="email"
              onChange={handleChangeInput}
              required
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
              onChange={handleChangeInput}
              required
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 md:w-auto md:px-10 lg:flex lg:mx-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6 my-5" to="/registrar">Regístrate</Link>
          <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6 my-5" to="/olvidepassword">Olvidé contraseña</Link>
        </nav>
      </div>
    </>
  );
}
