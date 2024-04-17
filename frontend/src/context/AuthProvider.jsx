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
    const actualizarPerfil = async (data) =>{
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
                const url = `/veterinarios/perfil/${data._id}`
                const {datos} = await clienteAxios.put(url, data, config)
                console.log(datos)
            }catch(err){
                console.log(err.response.data.msg)
            }
    }
    const guardarPassword = async (datos) => {
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
            url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url,datos, config)
            console.log(data)
            return({
                msg:data.msg
            })
        }catch(err){
            return({
                msg:err.response.data.msg,
                error:true
            })
        }
    }
    return(
        <AuthContext.Provider value={{
            auth, setAuth, cargando, cerrarSesion,actualizarPerfil,guardarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};

export default AuthContext;