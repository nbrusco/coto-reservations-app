import "./App.css";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
