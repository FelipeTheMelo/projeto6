import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/menu.jpg';

const HeaderContainer = styled.header`
  background-color: #ff6b00;
  padding: 20px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    color: white;
    font-weight: 600;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="Logo Efood" />
      </Link>
      <Nav>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/perfil">Perfil</Link>
      </Nav>
    </HeaderContainer>
  );
}