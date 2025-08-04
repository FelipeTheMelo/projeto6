import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Main = styled.main`
    display: flex;
    justify-content: space-between;
    min-height: 80vh;
    padding: 60px 80px;
    background: #fff8f0;
    `;

const FormContainer = styled.div`
    width: 60%;

    h1 {
        font-size: 28px;
        margin-bottom: 20px;
        color: #ff6b00;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    input {
        padding: 12px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #ddd;
    }

    button {
        margin-top: 20px;
        padding: 12px;
        font-size: 16px;
        background: #ff6b00;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;

        &:hover {
        background: #e55d00;
        }
    }
    `;

const Resumo = styled.aside`
    width: 30%;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        }
    }

    .total {
        font-weight: bold;
        font-size: 18px;
        margin-top: 20px;
    }
    `;

export default function Pagamento() {
    return (
        <>
            <Header />
            <Main>
                <FormContainer>
                    <h1>Pagamento</h1>
                    <form>
                        <input type="text" placeholder="Número do cartão" />
                        <input type="text" placeholder="Nome do titular" />
                        <input type="text" placeholder="Validade (MM/AA)" />
                        <input type="text" placeholder="CVV" />
                        <Link to="/confirmacao">
                            <button type="button">Finalizar Pedido</button>
                        </Link>
                    </form>
                </FormContainer>

                <Resumo>
                    <h2>Resumo do Pedido</h2>
                    <ul>
                        <li><span>Spaghetti</span><span>R$ 25</span></li>
                        <li><span>Pizza Margherita</span><span>R$ 30</span></li>
                    </ul>
                    <p className="total">Total: R$ 55</p>
                </Resumo>
            </Main>
            <Footer />
        </>
    );
}