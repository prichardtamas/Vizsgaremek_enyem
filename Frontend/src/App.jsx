import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Instruments from "./pages/Instruments";
import Rent from "./pages/Rent";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
