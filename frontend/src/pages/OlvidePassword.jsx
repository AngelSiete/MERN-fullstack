import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";

export default function OlvidePassword() {
  const [email,setEmail] =  useState('')
  const [alerta,setAlerta] =  useState({})
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email){
      setAlerta({msg:'email obligatorio',error:true})
      return
    }
    try{
      const {data} = await clienteAxios.post('/veterinarios/reset-password',{
        email
      })
      setAlerta({msg:data.msg,error:false})
    }catch(err){
      setAlerta({
        msg:err.response.data.msg,error:true
      })
    }
  }
  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Resetea tu <span className="text-black">contraseña</span>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar código al correo"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 md:w-auto md:px-10 lg:flex lg:mx-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
              <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6" to="/">Inicia sesión</Link>
              <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6" to="/registrar">Crea tu cuenta</Link>
            </nav>
      </div>
    </>
  );
}
