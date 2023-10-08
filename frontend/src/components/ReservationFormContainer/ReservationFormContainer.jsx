import ReservationForm from "../ReservationForm/ReservationForm";

import {
    loadingSwal,
    reservationSwal,
    errorSwal,
  } from "../../services/sweetalert2/swalCalls";

const ReservationFormContainer = () => {
  const appointReservation = async (values) => {
    try {
        loadingSwal();
        const authToken = localStorage.getItem("authToken");

        const response = await fetch(
          "http://localhost:8080/api/v1/reservations/",
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          reservationSwal();
        } else {
          throw data;
        }
      } catch ({ error }) {
        errorSwal(error);
      }
  }


  return (
    <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]">
      <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-thin md:text-2xl text-white">
            Realiza una reserva
          </h1>
          <ReservationForm submitFn={appointReservation} btnText={"Realizar reserva"}/>
        </div>
      </div>
    </div>
  );
};

export default ReservationFormContainer;
