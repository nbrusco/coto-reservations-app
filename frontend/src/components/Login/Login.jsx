import { useFormik } from "formik";
import * as Yup from "yup";

import {
  firstLoginSwal,
  loginSwal,
  errorSwal
} from "../../services/sweetalert2/swalCalls.js";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("Este campo es obligatorio"),
      password: Yup.string().required("Este campo es obligatorio"),
    }),
    onSubmit: async (values) => {
      firstLoginSwal()
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/login', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          loginSwal();
        } else {
          throw data
        }
      } catch ({ error }) {
        errorSwal(error)
      }
      console.log("Values:", values);

    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]">
        <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-thin md:text-2xl text-white">
              Ingresa a tu cuenta
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
            >
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
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="correo@dominio.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium mt-6 text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`border sm:text-sm rounded-lg focus:ring-blue-700 focus:border-blue-800 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="••••••••"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
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
                className="my-2 w-full text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600"
              >
                Ingresar
              </button>
            </form>
            <div className="flex items-center justify-between">
              <a
                href="/reestablecimiento"
                className="text-sm font-medium text-violet-500 hover:underline hover:text-violet-400"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <p className="text-sm font-light text-gray-300">
              ¿Aún no tenes una cuenta?
              <a
                href="/registro"
                className="ml-1 font-medium text-violet-500 hover:underline hover:text-violet-400"
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

export default Login;
