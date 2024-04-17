import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

export default function CambiarPassword(){
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual:'',
        pwd_nuevo:''
    })
    const {guardarPassword} = useAuth();
    const handleChangeInput = (e) => {
        setPassword({
          ...password,
          [e.target.name]: e.target.value,
        });
      };
      const handleFormSubmit = async e => {
        e.preventDefault();
       if (Object.values(password).some(campo => campo === '')){
        setAlerta({
            msg: 'todos los campos son obligatorios',
            error: true
        })
       }
       if ( password.pwd_nuevo.length < 6 ){
        setAlerta({
            msg: 'minimo 6 caracteres',
            error: true
        })
       }
       const respuesta = await guardarPassword(password)
       setAlerta(respuesta)
      }
    const { msg } = alerta
    return(
        <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar contraseña</h2>
        <p className="text-center text-xl">Modifica tu contraseña:</p>
        <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow p-5">
            {msg && <Alerta alerta={alerta}></Alerta>}
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold">Contraseña Actual</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                value={password.pwd_actual || ""}
                onChange={handleChangeInput}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold">Nueva Contraseña:</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nuevo"
                value={password.pwd_nuevo || ""}
                onChange={handleChangeInput}
              />
            </div>
            <input
              type="submit"
              value="Actualizar Contraseña"
              className="bg-indigo-800 px-10 py-3 font-bold text-white w-full mt-5"
            />
          </form>
        </div>
      </div>
        </>
    )
}