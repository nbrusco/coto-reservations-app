import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const ReservationForm = ({ submitFn, reservation, btnText }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(tomorrow.getHours() - 3);
  const minDate = tomorrow.toISOString().split("T")[0];

  const threeMonts = new Date();
  threeMonts.setDate(threeMonts.getDate() + 90);
  const maxDate = threeMonts.toISOString().split("T")[0];

  const typeOptions = ["Cumpleaños", "Fiesta infantil", "Celebracion"];
  const timeOptions = ["16:00", "17:00", "18:00", "19:00"];

  if (reservation) {
    const [datePart, timePart] = reservation.date.split("T");
    reservation.time = timePart?.substring(0, 5);
    reservation.date = datePart;
  }

  const formik = useFormik({
    initialValues: {
      date: reservation?.date || "",
      time: reservation?.time || "",
      type: reservation?.type || "",
      guests: reservation?.guests || "",
      commentaries: reservation?.commentaries || "",
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
      reservation?._id ? (values._id = reservation._id) : null;
      submitFn(values);
    },
  });

  return (
    <>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
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
              formik.touched.date && formik.errors.date ? "border-red-500" : ""
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
              formik.touched.time && formik.errors.time ? "border-red-500" : ""
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
              formik.touched.type && formik.errors.type ? "border-red-500" : ""
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
          {btnText}
        </button>
      </form>
    </>
  );
};

export default ReservationForm;

ReservationForm.propTypes = {
  submitFn: PropTypes.func,
  reservation: PropTypes.object,
  btnText: PropTypes.string,
};
