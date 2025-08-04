import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 40px 80px;
    text-align: center;
`;

export default function Confirmacao() {
    const location = useLocation();
    const pedido = location.state;

    return (
        <Container>
            <h1>Pedido Confirmado!</h1>
            <p>Obrigado pela compra. Seu pedido foi realizado com sucesso.</p>

            {pedido && (
                <>
                    <h3 style={{ marginTop: '20px' }}>Detalhes do Pedido</h3>
                    <pre style={{ textAlign: 'left', background: '#f2f2f2', padding: '20px', borderRadius: '8px' }}>
                        {JSON.stringify(pedido, null, 2)}
                    </pre>
                </>
            )}

            <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
                Voltar à Home
            </Link>
        </Container>
    );
}