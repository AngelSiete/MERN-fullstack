import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesión y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 py-6 shadow-lg px-5 rounded-xl bg-white">
        <form>
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
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 md:w-auto md:px-10 lg:flex lg:mx-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6 my-5" to="/registrar">Regístrate</Link>
          <Link className="bg-indigo-700 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-400 px-6 my-5" to="/olvidepassword">Olvidé contraseña</Link>
        </nav>
      </div>
    </>
  );
}
