import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

export default function EditarPerfil() {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);
  const handleChangeInput = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const {nombre,email} = perfil;
    if ([nombre,email].includes('')){
        setAlerta({
            msg:'nombre y email obligatorios', error:true
        })
        return;
    }
    actualizarPerfil(perfil)
  }
  const { msg } = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Modificar tu perfil
      </h2>
      <p className="text-center text-xl">Modifica tu perfil:</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow p-5">
            {msg && <Alerta alerta={alerta}></Alerta>}
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold">Nombre</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={handleChangeInput}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold">Sitio web</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.web || ""}
                onChange={handleChangeInput}
                name="web"
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold">Telefono</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.telefono || ""}
                onChange={handleChangeInput}
                name="telefono"
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.email || ""}
                onChange={handleChangeInput}
                name="email"
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-800 px-10 py-3 font-bold text-white w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
}
