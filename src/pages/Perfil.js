import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

import avatar from "../assets/ladolce.png"; // Imagem oficial do perfil

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff8f0;
    min-height: 80vh;
    padding: 60px 20px;

    h1 {
        margin-top: 20px;
        font-size: 28px;
        color: #ff6b00;
    }
    `;

const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #ff6b00;
`;

export default function Perfil() {
    return (
        <>
            <Header />
            <Main>
                <Avatar src={avatar} alt="Avatar do usuário" />
                <h1>Felipe Melo</h1>
                <p style={{ marginTop: "10px", fontSize: "18px" }}>felipe@email.com</p>
            </Main>
            <Footer />
        </>
    );
}