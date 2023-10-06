import { useFormik } from "formik";
import * as Yup from "yup";

const ReservationForm = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      eventType: "",
      guestCount: "",
      comments: "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .min(minDate, "No se puede reservar para hoy o fechas pasadas")
        .required("Este campo es obligatorio"),
      time: Yup.string().required("Este campo es obligatorio"),
      eventType: Yup.string().required("Este campo es obligatorio"),
      guestCount: Yup.number()
        .integer("Debe ser un número entero")
        .min(1, "Debe ser un número positivo")
        .required("Este campo es obligatorio"),
    }),
    onSubmit: (values) => {
      const dateAndTime = new Date(`${values.date}T${values.time}`);
      console.log("Fecha y Hora Seleccionadas:", dateAndTime);
      console.log("Values:", values);
      // Acá va fetch a backend
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
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.time}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="eventType"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Tipo de Evento
                </label>
                <select
                  name="eventType"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.eventType && formik.errors.eventType
                      ? "border-red-500"
                      : ""
                  }`}
                  required=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventType}
                >
                  <option value="" disabled>
                    Selecciona el tipo de evento
                  </option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="infantil">Fiesta infantil</option>
                  <option value="celebracion">Celebracion</option>
                </select>
                {formik.touched.eventType && formik.errors.eventType ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.eventType}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="guestCount"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Cantidad de invitados
                </label>
                <input
                  type="number"
                  name="guestCount"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.guestCount && formik.errors.guestCount
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guestCount}
                />
                {formik.touched.guestCount && formik.errors.guestCount ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.guestCount}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="comments"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Comentarios
                </label>
                <textarea
                  name="comments"
                  className={`border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ${
                    formik.touched.comments && formik.errors.comments
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Escribe cualquier detalle que quieras hacernos saber (opcional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comments}
                />
                {formik.touched.comments && formik.errors.comments ? (
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {formik.errors.comments}
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
