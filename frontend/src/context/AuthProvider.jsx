import {useState, useEffect,createContext} from 'react';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        const autenticarUsuario = async()=> {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            } 
            try{
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data);
                navigate("/admin")
            }catch(err){
                console.log(err.resposne.data.msg)
                setAuth({});
            }
            setCargando(false)
        }
        autenticarUsuario();
    },[])
    const cerrarSesion = () =>{
        localStorage.removeItem('token');
        setAuth({})
    }
    return(
        <AuthContext.Provider value={{
            auth, setAuth, cargando, cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};

export default AuthContext;