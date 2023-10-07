import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      age: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Este campo es obligatorio"),
      last_name: Yup.string().required("Este campo es obligatorio"),
      age: Yup.number()
        .required("Este campo es obligatorio")
        .positive()
        .integer(),
      email: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("Este campo es obligatorio"),
      password: Yup.string().required("Este campo es obligatorio"),
    }),
    onSubmit: async (values) => {
      register(values);
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]">
        <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-thin md:text-2xl text-white">
              Crea tu cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
              id="registerForm"
            >
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nombre
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Benito"
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.first_name}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Apellido
                </label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Sosa"
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.last_name}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Edad
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.age && formik.errors.age
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="35"
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.age}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="correo@dominio.com"
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="my-2 w-full text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600"
              >
                Registrar
              </button>
              <p className="text-sm font-light text-gray-400">
                ¿Ya tienes una cuenta?
                <a
                  href="/login"
                  className="ml-1 font-medium text-violet-500 hover:underline hover:text-violet-400"
                >
                  Ingresa aquí
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
