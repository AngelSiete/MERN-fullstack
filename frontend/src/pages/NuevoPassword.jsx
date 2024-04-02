import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

export default function NuevoPassword(){
    const [contraseña, setContraseña] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [tokenValido, setTokenValido] = useState(false);
    const {token} = useParams();
    useEffect(()=>{
        const comprobarToken = async () => {
            try{
                await clienteAxios(`/veterinarios/reset-password/${token}`)
                setAlerta({
                    msg: 'token valido', error:false
                })
                setTokenValido(true)
            }
            catch(err){
                setAlerta({
                    msg: 'error en enlace', error:true
                })
            }
        }
        comprobarToken();
    },[])
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (contraseña.length < 6){
            setAlerta({
                msg: 'password minimo 6 caracteres', error:true
            })
        }
        try{
            const {data} = await clienteAxios.post(`/veterinarios/reset-password/${token}`, {password:contraseña})
            setAlerta({
                msg: data.msg, error:false
            })
        }catch(err){
            setAlerta({
                msg: err.response.data.msg, error:true
            })
        }
    }
    const { msg } = alerta;
    return(
        <>
        <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu{" "}
          <span className="text-black">contraseña</span>
        </h1>
      </div>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
      <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
        <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              name="password"
              required
              onChange={e => setContraseña(e.target.value)}
            />
            <input
            type="submit"
            value="Cambia tu contraseña"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 md:w-auto md:px-10 lg:flex lg:mx-auto mt-6"
          />
          </div>
        </form>
        {<Link
            className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6"
            to="/"
          >
            Inicia sesión
          </Link>}
      </div>
      )}
        </>
    )
}