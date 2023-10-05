const LoginForm = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 mx-auto">
        <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-thin md:text-2xl text-white">
              Ingresa a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" id="loginForm">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  className="border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="correo@dominio.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg focus:ring-blue-700 focus:border-blue-800 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="w-4 h-4 border focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="rememberMe" className="text-gray-300">
                    Recuérdame
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="my-2 w-full text-white bg-violet-700 hover:bg-violet-800 hover: ring-1 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600"
              >
                Ingresar
              </button>
            </form>
            <div className="flex items-center justify-between">
              <a
                href="/restore"
                className="text-sm font-medium text-violet-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <p className="text-sm font-light text-gray-300">
              ¿Aún no tenes una cuenta?
              <a
                href="/register"
                className="ml-1 font-medium hover:underline text-violet-500"
              >
                Registrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
