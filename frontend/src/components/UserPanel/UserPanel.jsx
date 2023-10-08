import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import Reservations from "../Reservations/Reservations";

const UserPanel = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col items-center justify-center tracking-wide px-6 py-8 w-[80vw]">
        <div className="w-full rounded-lg shadow-md shadow-violet-700 hover:shadow-violet-600 hover:shadow-lg transition-all border md:mt-0 sm:max-w-xl xl:p-0 bg-gray-900/80 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center font-thin text-2xl text-slate-50 tracking-wider">
              ¡Hola, {user.name}!
            </h1>
            <Reservations
              welcomeText={"Tus reservaciones"}
              noReservationsText={"En este momento, no tienes ninguna reserva "}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanel;
