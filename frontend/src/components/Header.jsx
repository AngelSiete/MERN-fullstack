import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const {cerrarSesion} = useAuth();
    return (
        <header className="py-10 bg-indigo-600">
          <div className="container mx-auto flex flex-col lg:flex-row lg:px-4 justify-between items-center">
            <h1 className="text-white font-bold text-4xl text-center">Administrador Pacientes</h1>
            <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 items-center">
                <Link to="/pacientes" className="text-white text-xl uppercase hover:text-blue-400 hover:font-bold ">Pacientes</Link>
                <Link to="/perfil" className="text-white text-xl uppercase hover:text-blue-400 hover:font-bold ">Perfil</Link>
                <button type="button" className="text-white text-xl uppercase hover:text-blue-400 hover:font-bold" onClick={cerrarSesion}> Cerrar Sesión</button>
            </nav>
          </div>
        </header>
        );
};

export default Header;