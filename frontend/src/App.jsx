import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <>
      <div>
        <h1 className="text-center py-6 pb-0 text-xl md:text-2xl font-thin tracking-widest text-white">
          ¡Bienvenidos al nuevo portal de <span><img src="/zona-logo.png" alt="logo" className="w-8 -mt-2 inline" />
          </span> Zona juegos!
        </h1>

        <LoginForm />
      </div>
    </>
  );
}

export default App;
