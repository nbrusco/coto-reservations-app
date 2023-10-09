import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ReservationForm from '../../components/ReservationForm/ReservationForm'

const MySwal = withReactContent(Swal); //eslint-disable-line

export const loadingSwal = () => {
  MySwal.fire({
    title: 'Procesando.',
    text: 'Espere un momento, por favor...',
    allowOutsideClick: false,
    icon: 'info',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 3000,
    timerProgressBar: true
  })
}

export const loginSwal = () => {
  MySwal.fire({
    title: 'Logueo exitoso',
    text: '¡Bienvenido!',
    allowOutsideClick: false,
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = '/'
    }
  })
}

export const logoutSwal = () => {
  Swal.fire({
    title: 'Deslogueo exitoso!',
    text: 'Dirigiendote a home, ¡Hasta luego!',
    allowOutsideClick: false,
    confirmButton: false,
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    willClose: () => {
      window.location.href = '/'
    }
  })
}

export const registerSwal = () => {
  Swal.fire({
    title: 'Registro exitoso!',
    text: 'Dirigiendote a pantalla de login.',
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = '/login'
    }
  })
}

export const passRecoverySwal = () => {
  Swal.fire({
    title: 'Solicitud exitosa!',
    text: 'Revisa tu correo electrónico para obtener las instrucciones.',
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = '/'
    }
  })
}

export const passUpdateSwal = () => {
  Swal.fire({
    title: 'Cambio exitoso!',
    text: 'Dirigiendote a pantalla de login.',
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = '/login'
    }
  })
}

export const reservationSwal = () => {
  MySwal.fire({
    title: 'Reserva exitosa!',
    text: 'Muchas gracias! Se enviaron los detalles a tu correo',
    allowOutsideClick: false,
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = '/reservas'
    }
  })
}

export const confirmEditionSwal = (reservation, editReservation) => {
  MySwal.fire({
    title: 'Editar reserva',
    html: (
      <ReservationForm
        submitFn={editReservation}
        reservation={reservation}
        btnText='Modificar reserva'
      />
    ),
    icon: 'question',
    showConfirmButton: false,
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    }
  })
}

export const editReservationSwal = () => {
  MySwal.fire({
    title: 'Reserva editada!',
    text: 'Se enviaron los detalles a tu correo',
    allowOutsideClick: false,
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true
  })
}

export const confirmDeletionSwal = async () => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    html: `<p>Esta acción no se puede deshacer.</p>
    <input type="text" id="reason" class="swal2-input" placeholder="Razon...">`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5'
    },
    preConfirm: () => {
      const reason = Swal.getPopup().querySelector('#reason').value
      return { isConfirmed: true, reason }
    }
  })
  return result
}

export const deleteReservationSwal = () => {
  MySwal.fire({
    title: 'Reserva eliminada!',
    text: 'Se enviaron los detalles a tu correo',
    allowOutsideClick: false,
    icon: 'success',
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    },
    timer: 2000,
    timerProgressBar: true
  })
}

export const errorSwal = (
  error = 'Hubo un error en la solicitud, por favor, intenta de nuevo!'
) => {
  Swal.fire({
    title: 'Error!',
    html: `<strong class="text-bold">${error}</strong>`,
    icon: 'error',
    timer: 5000,
    footer: '¡Disculpa las molestias!',
    timerProgressBar: true,
    customClass: {
      popup: '!text-slate-100 !bg-gray-900/90 !rounded-3xl',
      confirmButton: '!bg-violet-600 !px-5',
      timerProgressBar: '!m-auto !h-1 !my-2 !bg-violet-600/90 !rounded-3xl'
    }
  })
}
