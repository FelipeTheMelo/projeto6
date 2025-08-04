import React from 'react';
import styled from 'styled-components';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';

const FooterContainer = styled.footer`
    background: #ff6b00;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 10px;
    `;

const Redes = styled.div`
    display: flex;
    gap: 20px;

    img {
        width: 24px;
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <p>Efood © 2025 - Todos os direitos reservados</p>
            <Redes>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <img src={facebook} alt="Facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <img src={instagram} alt="Instagram" />
                </a>
            </Redes>
        </FooterContainer>
    );
}