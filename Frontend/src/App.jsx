import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Application from "./pages/Application";
import Instruments from "./pages/Instruments";
import Rent from "./pages/Rent";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
