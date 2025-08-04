import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Entrega from './pages/Entrega';
import Confirmacao from './pages/Confirmacao';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/entrega" element={<Entrega />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}