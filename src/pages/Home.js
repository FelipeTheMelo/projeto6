import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardProduto from '../components/CardProduto';
import ModalProduto from '../components/ModalProduto';

const Container = styled.div`
    padding: 40px 80px;
    `;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [modalProduto, setModalProduto] = useState(null);

    useEffect(() => {
        fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
            .then(res => res.json())
            .then(data => {
                // Exemplo: Pega o cardápio do primeiro restaurante
                setProdutos(data[0].cardapio);
            });
    }, []);

    return (
        <Container>
            <h1 style={{ marginBottom: '20px' }}>Cardápio</h1>
            <Grid>
                {produtos.map(prod => (
                    <CardProduto
                        key={prod.id}
                        produto={prod}
                        onClick={() => setModalProduto(prod)}
                    />
                ))}
            </Grid>

            {modalProduto && (
                <ModalProduto
                    produto={modalProduto}
                    onClose={() => setModalProduto(null)}
                />
            )}
        </Container>
    );
}