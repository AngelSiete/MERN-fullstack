import { Link } from "react-router-dom";

export default function AdminNav(){
    return(
        <nav>
            <Link to="/admin/perfil" className="font-bold uppercase text-gray-500 m-4 hover:text-black">Perfil</Link>
            <Link to="/admin/cambiar-password" className="font-bold uppercase text-gray-500 m-4 hover:text-black">Cambia tu contraseña</Link>
        </nav>
    )
}