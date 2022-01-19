import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from './components/layout/NavBar'
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Projects from "./components/pages/Projects";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";

import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
     <NavBar/>
      <Container customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newprojects" element={<NewProject />} />
        </Routes>
      </Container>
     <Footer/>
    </Router>
  );
}

export default App;
