import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import { errorSwal } from '../../services/sweetalert2/swalCalls'

const authToken = localStorage.getItem('authToken') || 'null'

const ReservationForm = ({ submitFn, reservation, btnText }) => {
  const [occupiedDates, setOccupiedDates] = useState([])

  useEffect(() => {
    const getOccupiedDates = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1/reservations/dates/occupied',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        setOccupiedDates(data.payload)
      } catch ({ error }) {
        errorSwal(error)
      }
    }
    getOccupiedDates()
  }, [])

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(tomorrow.getHours() - 3)
  const minDate = tomorrow.toISOString().split('T')[0]

  const threeMonts = new Date()
  threeMonts.setDate(threeMonts.getDate() + 90)
  const maxDate = threeMonts.toISOString().split('T')[0]

  const typeOptions = ['Cumpleaños', 'Fiesta infantil', 'Celebracion']
  const timeOptions = ['16:00', '17:00', '18:00', '19:00']

  if (reservation) {
    const [datePart, timePart] = reservation.date.split('T')
    reservation.time = timePart?.substring(0, 5)
    reservation.date = datePart
  }

  const isDateFullyBooked = (date) => {
    const timesForDate = occupiedDates
      .filter((dateTime) =>
        dateTime.startsWith(date.toISOString().split('T')[0])
      )
      .map((dateTime) => dateTime.split('T')[1].substring(0, 5))

    return timeOptions.every((time) => timesForDate.includes(time))
  }

  const initialValues = {
    date: reservation?.date || '',
    time: reservation?.time || '',
    type: reservation?.type || '',
    guests: reservation?.guests || '',
    commentaries: reservation?.commentaries || ''
  }

  const validationSchema = Yup.object({
    date: Yup.date()
      .min(minDate, 'No se puede reservar para hoy o fechas pasadas')
      .max(maxDate, 'No se puede reservar para más de 90 días')
      .test(
        'isFullyBooked',
        'Este día está completamente ocupado',
        (value) => !isDateFullyBooked(value)
      )
      .required('Este campo es obligatorio'),
    time: Yup.string().required('Este campo es obligatorio'),
    type: Yup.string().required('Este campo es obligatorio'),
    guests: Yup.number()
      .integer('Debe ser un número entero')
      .min(1, 'Debe ser un número positivo')
      .required('Este campo es obligatorio')
  })

  const onSubmit = async (values) => {
    reservation?._id ? (values._id = reservation._id) : null
    submitFn(values)
  }

  return (
    <>
      <Formik
        className='space-y-4 md:space-y-6'
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className='my-6'>
              <label
                htmlFor='date'
                className='block mb-2 text-sm font-medium text-white'
              >
                Fecha
              </label>
              <Field
                id='date'
                name='date'
                type='date'
                required=''
                className={`border sm:text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                  touched.date && errors.date ? 'border-red-500' : ''
                }`}
                onClick={(e) => {
                  const selectedDate = e.target.value
                  values.date = selectedDate
                  values.time = ''
                }}
              />
              {touched.date && errors.date
                ? (
                  <div className='text-red-500 text-xs mt-1 absolute'>
                    {errors.date}
                  </div>
                  )
                : null}
            </div>
            <div className='my-6'>
              <label
                htmlFor='time'
                className='block mb-2 text-sm font-medium text-white'
              >
                Horario
              </label>
              <Field
                as='select'
                id='time'
                name='time'
                className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                  touched.time && errors.time ? 'border-red-500' : ''
                }`}
                required=''
              >
                <option value='' disabled>
                  Selecciona un horario
                </option>
                {timeOptions.map((value) => {
                  const isDisabled = occupiedDates.includes(
                    `${values.date}T${value}:00.000Z`
                  )
                  return (
                    <option key={value} value={value} disabled={isDisabled}>
                      {value}
                    </option>
                  )
                })}
              </Field>
              {touched.time && errors.time
                ? (
                  <div className='text-red-500 text-xs mt-1 absolute'>
                    {errors.time}
                  </div>
                  )
                : null}
            </div>
            <div className='my-6'>
              <label
                htmlFor='type'
                className='block mb-2 text-sm font-medium text-white'
              >
                Tipo de Evento
              </label>
              <Field
                as='select'
                id='type'
                name='type'
                className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                  touched.type && errors.type ? 'border-red-500' : ''
                }`}
                required=''
              >
                <option value='' disabled>
                  Selecciona el tipo de evento
                </option>
                {typeOptions.map((eventType) => (
                  <option key={eventType} value={eventType}>
                    {eventType}
                  </option>
                ))}
              </Field>
              {touched.type && errors.type
                ? (
                  <div className='text-red-500 text-xs mt-1 absolute'>
                    {errors.type}
                  </div>
                  )
                : null}
            </div>
            <div className='my-6'>
              <label
                htmlFor='guests'
                className='block mb-2 text-sm font-medium text-white'
              >
                Cantidad de invitados
              </label>
              <Field
                id='guests'
                type='number'
                name='guests'
                className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                  touched.guests && errors.guests ? 'border-red-500' : ''
                }`}
                placeholder='10'
              />
              {touched.guests && errors.guests
                ? (
                  <div className='text-red-500 text-xs mt-1 absolute'>
                    {errors.guests}
                  </div>
                  )
                : null}
            </div>
            <div className='my-6'>
              <label
                htmlFor='commentaries'
                className='block mb-2 text-sm font-medium text-white'
              >
                Comentarios
              </label>
              <Field
                component='textarea'
                id='commentaries'
                name='commentaries'
                className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                  touched.commentaries && errors.commentaries
                    ? 'border-red-500'
                    : ''
                }`}
                placeholder='Escribe cualquier detalle que quieras hacernos saber (opcional)'
              />
              {touched.commentaries && errors.commentaries
                ? (
                  <div className='text-red-500 text-xs mt-1 absolute'>
                    {errors.commentaries}
                  </div>
                  )
                : null}
            </div>
            <button
              type='submit'
              className='my-2 w-full text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600'
            >
              {btnText}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ReservationForm

ReservationForm.propTypes = {
  submitFn: PropTypes.func,
  reservation: PropTypes.object,
  btnText: PropTypes.string
}
