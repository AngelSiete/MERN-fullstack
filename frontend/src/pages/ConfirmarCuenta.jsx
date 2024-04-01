import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";


export default function ConfirmarCuenta() {
    const {id} = useParams();
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    console.log(id)
    useEffect(()=>{
        const confirmarCuenta = async () => {
            try{
                const url = `/veterinarios/confirmar/${id}`
                const {data} = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({msg:data.msg, error:false})
            }catch(err){
                setAlerta({msg:err.response.data.msg, error:true})
            }
            setCargando(false)
        }
        confirmarCuenta();
    },[])
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta}></Alerta>}
        {cuentaConfirmada && (
            <Link
            className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6"
            to="/"
          >
            Inicia sesión
          </Link>
        )}
    </div>
    </>
  );
}
