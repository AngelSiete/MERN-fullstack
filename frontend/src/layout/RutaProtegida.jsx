import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from '../components/Header'
import Footer from '../components/Footer'

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();
    console.log(auth)
    return(
        <>
        <Header></Header>
           {cargando && <p>Cargando...</p>}
           { auth ? (<main className="container mx-auto mt-10"><Outlet/></main>) : <Navigate to="/"/>}
        <Footer></Footer>
        </>
    )
}

export default RutaProtegida;