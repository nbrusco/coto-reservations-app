import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../context/AuthContext'

const PasswordReset = () => {
  const { resetPass } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')

    !token ? navigate('/') : null
  }, [location.search, navigate])

  const formik = useFormik({
    initialValues: {
      password: '',
      password2: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Este campo es obligatorio'),
      password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Este campo es obligatorio')
    }),
    onSubmit: async (values) => {
      resetPass(values)
    }
  })

  return (
    <div>
      <div className='flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]'>
        <div className='w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-thin md:text-2xl text-white'>
              Cambiar mi contraseña
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={formik.handleSubmit}
              id='passRestoreForm'
            >
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Nueva contraseña
                </label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='••••••••'
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : ''
                  }`}
                  required=''
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password
                  ? (
                    <div className='text-red-500 text-xs mt-1 absolute'>
                      {formik.errors.password}
                    </div>
                    )
                  : null}
              </div>
              <div>
                <label
                  htmlFor='password2'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Repetir la nueva contraseña
                </label>
                <input
                  id='password2'
                  type='password'
                  name='password2'
                  placeholder='••••••••'
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.password2 && formik.errors.password2
                      ? 'border-red-500'
                      : ''
                  }`}
                  required=''
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password2}
                />
                {formik.touched.password2 && formik.errors.password2
                  ? (
                    <div className='text-red-500 text-xs mt-1 absolute'>
                      {formik.errors.password2}
                    </div>
                    )
                  : null}
              </div>
              <button
                type='submit'
                className='my-2 w-full text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600'
              >
                Cambiar contraseña
              </button>
              <p className='text-sm font-light text-gray-400'>
                ¿Recordaste tu contraseña?
                <a
                  href='/'
                  className='ml-1 font-medium text-violet-500 hover:underline hover:text-violet-400'
                >
                  Ir a Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
