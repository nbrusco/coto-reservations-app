import { useFormik } from "formik";
import * as Yup from "yup";

import {
  loadingSwal,
  reservationSwal,
  errorSwal,
} from "../../services/sweetalert2/swalCalls";

const ReservationForm = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const threeMonts = new Date();
  threeMonts.setDate(threeMonts.getDate() + 90)
  const maxDate = threeMonts.toISOString().split("T")[0];

  const typeOptions = ["Cumpleaños", "Fiesta infantil", "Celebracion"];
  const timeOptions = ["16:00", "17:00", "18:00", "19:00"];

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      type: "",
      guests: "",
      commentaries: "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .min(minDate, "No se puede reservar para hoy o fechas pasadas")
        .max(maxDate, "No se puede reservar para más de 90 días")
        .required("Este campo es obligatorio"),
      time: Yup.string().required("Este campo es obligatorio"),
      type: Yup.string().required("Este campo es obligatorio"),
      guests: Yup.number()
        .integer("Debe ser un número entero")
        .min(1, "Debe ser un número positivo")
        .required("Este campo es obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        loadingSwal();
        const dateAndTime = new Date(`${values.date}T${values.time}`);

        values.dateAndTime = dateAndTime;
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
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]">
        <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900/80 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-thin md:text-2xl text-white">
              Realiza una reserva
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Fecha
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.date && formik.errors.date
                      ? "border-red-500"
                      : ""
                  }`}
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.date}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Horario
                </label>
                <select
                  id="time"
                  name="time"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.time && formik.errors.time
                      ? "border-red-500"
                      : ""
                  }`}
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                >
                  <option value="" disabled>
                    Selecciona un horario
                  </option>
                  {timeOptions.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.time}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Tipo de Evento
                </label>
                <select
                  id="type"
                  name="type"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.type && formik.errors.type
                      ? "border-red-500"
                      : ""
                  }`}
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="" disabled>
                    Selecciona el tipo de evento
                  </option>
                  {typeOptions.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
                {formik.touched.type && formik.errors.type ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.type}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Cantidad de invitados
                </label>
                <input
                  id="guests"
                  type="number"
                  name="guests"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.guests && formik.errors.guests
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guests}
                />
                {formik.touched.guests && formik.errors.guests ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.guests}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="commentaries"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Comentarios
                </label>
                <textarea
                  id="commentaries"
                  name="commentaries"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.commentaries && formik.errors.commentaries
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Escribe cualquier detalle que quieras hacernos saber (opcional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.commentaries}
                />
                {formik.touched.commentaries && formik.errors.commentaries ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.commentaries}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="my-2 w-full text-white bg-violet-700 hover:bg-violet-800 border-violet-700 active:bg-violet-900 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-violet-600"
              >
                Realizar reserva
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
