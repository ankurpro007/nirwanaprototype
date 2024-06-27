import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import PS1 from "./components/PS1/PS1";
import PS2 from "./components/PS2/PS2";
import PS3 from "./components/PS3/PS3";
import CAD from "./components/cad/cad";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<PS3 />} />
            <Route path="/ps1" element={<PS1 />} />
            <Route path="/ps2" element={<PS2 />} />
            <Route path="/ps3" element={<PS3 />} />
            <Route path="/cad" element={<CAD />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
