import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserAuthContext } from "./hooks/useUserAuthContext";
import { useLocationsContext } from "./hooks/useLocationsContext";
import "./App.css";

import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import About from "./components/About.js";
import Weather from "./components/Weather.js";
import AddLocation from "./components/search/AddLocation";

function App() {
  const { user } = useUserAuthContext();
  const { locations } = useLocationsContext();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Weather /> : <Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/weather" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/weather" />} />
        <Route path="/addLocation" element={<AddLocation />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
