import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../context/AuthContext";
import { IconsMenu } from "../Icons/IconMenu";

import {
  loadingSwal,
  errorSwal,
  deleteReservationSwal,
  confirmEditionSwal,
  editReservationSwal,
  confirmDeletionSwal,
} from "../../services/sweetalert2/swalCalls";

const Reservations = ({ welcomeText, noReservationsText }) => {
  const { user, token } = useContext(AuthContext);
  const [reservations, setReservations] = useState(null);

  let fetchURL;
  user.role === "admin"
    ? (fetchURL = `http://localhost:8080/api/v1/reservations/`)
    : (fetchURL = `http://localhost:8080/api/v1/reservations/appointments/${user.email}`);

  const getReservationsByEmail = useCallback(async () => {
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setReservations(data.payload);
      }

      return data;
    } catch ({ error }) {
      setReservations(null);
      errorSwal(error);
    }
  }, [setReservations, fetchURL, token]);

  useEffect(() => {
    getReservationsByEmail();
  }, [user, getReservationsByEmail]);

  const formatDate = (date) => {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const dateAndTime = new Date(date);
    const dateFormat = dateAndTime.toLocaleDateString("es-AR", dateOptions);

    const adjustedTime = new Date(
      dateAndTime.getTime() + dateAndTime.getTimezoneOffset() * 60 * 1000
    );
    const timeFormat = adjustedTime.toLocaleTimeString("es-AR", timeOptions);

    return `${dateFormat} a las ${timeFormat}hs`;
  };

  const editReservation = async (values) => {
    try {
      loadingSwal();
      console.log(token)
      const response = await fetch(
        `http://localhost:8080/api/v1/reservations/${values._id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        editReservationSwal();
        getReservationsByEmail();
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const { isConfirmed, reason } = await confirmDeletionSwal();
      if (isConfirmed) {
        loadingSwal();
        const response = await fetch(
          `http://localhost:8080/api/v1/reservations/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "X-Reason": reason,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          deleteReservationSwal();
          getReservationsByEmail();
        } else {
          throw data;
        }
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col gap-4 mx-4 pb-2">
        {reservations && reservations.length > 0 ? (
          <>
            <h2 className="text-center font-thin text-xl text-slate-50 tracking-wider">
              {welcomeText}
            </h2>
            {reservations?.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-gray-800/90 flex flex-row items-center gap-2 rounded-md hover:bg-slate-500/50 transition-all duration-75 p-4"
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col gap-1 flex-grow text-left">
                    <h3 className="text-xl font-medium tracking-widest text-slate-100">
                      {reservation.type}
                    </h3>
                    <ul className="flex flex-col pl-1 gap-[1px]">
                      <h4 className="font-light tracking-wide text-slate-200">
                        - {formatDate(reservation.date)}
                      </h4>
                      <p className="font-light tracking-wide text-slate-200">
                        - {reservation.guests} Invitados
                      </p>
                      <p className="text-sm font-light text-slate-300">
                        - Código: {reservation.code}
                      </p>
                      <p className="text-sm font-light text-slate-300">
                        - Detalles: {reservation.commentaries}
                      </p>
                      {user.role === "admin" ? (
                        <p className="text-sm font-light text-slate-300">
                          - Usuario: {reservation.email}
                        </p>
                      ) : null}
                    </ul>
                  </div>
                  <div className="flex gap-4 flex-col">
                    <button
                      onClick={() =>
                        confirmEditionSwal(reservation, editReservation)
                      }
                      className="bg-violet-700/80 hover:bg-violet-800 focus:ring-2 focus:outline-none focus:ring-violet-600 rounded-md px-3 py-2 text-white"
                    >
                      {<IconsMenu icon={"EDIT"} className={"w-6 h-6"} />}
                    </button>
                    <button
                      onClick={() => deleteReservation(reservation._id)}
                      className="bg-red-700/80 hover:bg-red-800/80 focus:ring-2 focus:outline-none focus:ring-red-600 rounded-md px-3 py-2 text-white"
                    >
                      {<IconsMenu icon={"DELETE"} className={"w-6 h-6"} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h2 className="bg-gray-800/90 rounded-md hover:bg-slate-500/50 transition-all duration-75 py-6 my-4 text-center">
            {noReservationsText}
          </h2>
        )}
        <Link to="/nueva-reserva">
          <button className="my-2 w-2/3 text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600">
            Nueva reserva
          </button>
        </Link>
      </div>
    </>
  );
};

export default Reservations;

Reservations.propTypes = {
  welcomeText: PropTypes.string.isRequired,
  noReservationsText: PropTypes.string.isRequired,
};
