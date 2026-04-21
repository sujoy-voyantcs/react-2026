import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
//import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Todo from './pages/Todo';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          {/*  Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
        

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
