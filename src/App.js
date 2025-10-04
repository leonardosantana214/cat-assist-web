// Imports de recursos e de components
import "./App.css";

import Footer from "./components/Templates/Footer";
import Header from "./components/Templates/Header";
import Perfil from "./components/perfil/index";
import PergFreq from "./components/PergFreq";
import Home from "./components/home/index";
import Chat from "./components/chat/index.js";
import Avaliacao from "./components/Avaliacao";
import Sobrenos from "./components/SobreNos";
import Login from "./components/Login";
import ChatBot from "./components/ChatBot";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import {auth} from "./services/firebase/firebase"

function App() {
  // Hook para pegar a rota atual

  const location = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0); // Move o scroll para o topo
  }, [location]);

  // Verifica se a rota é "/cadastro" ou "/login"
  const isAuthPage = location.pathname === "/cadastro" || location.pathname === "/login";

  return (
    <div>
      {/* Exibe o Header exceto nas rotas /cadastro e /login */}
      {!isAuthPage && (
        <header>
          <Header />
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perguntas" element={<PergFreq />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nos" element={<Sobrenos />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>

      {/* Exibe o Footer exceto nas rotas /cadastro e /login */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
