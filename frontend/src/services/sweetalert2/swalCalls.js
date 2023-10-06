import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const firstLoginSwal = () => {
  MySwal.fire({
    title: "Procesando.",
    text: "Espere un momento, por favor...",
    allowOutsideClick: false,
    icon: "info",
    customClass: {
      popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
      confirmButton: "!bg-blue-600 !px-5",
      timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
    },
    timer: 3000,
    timerProgressBar: true,
  });
};

export const loginSwal = (statusText) => {
  MySwal.fire({
    title: "Logueo exitoso!",
    text: `${statusText}. Bienvenido!`,
    allowOutsideClick: false,
    icon: "success",
    customClass: {
      popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
      confirmButton: "!bg-blue-600 !px-5",
      timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
    },
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      window.location.href = "/";
    },
  });
};

export const errorSwal = (
  error = "Hubo un error en la solicitud, por favor, intenta de nuevo!"
) => {
  Swal.fire({
    title: "Error!",
    html: `<strong class="text-bold">${error}</strong>`,
    icon: "error",
    timer: 5000,
    footer: "Recargando página al cerrar",
    timerProgressBar: true,
    customClass: {
      popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
      confirmButton: "!bg-blue-600 !px-5",
      timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
    },
    willClose: () => {
    //   location.reload();
    },
  });
};
