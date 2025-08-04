import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeItem, clearCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    padding: 40px 80px;
`;

export default function Carrinho() {
    const { items, total } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container>
            <h1>Carrinho</h1>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                {item.nome} - R$ {item.preco.toFixed(2)}
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => dispatch(removeItem(item.id))}
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: R$ {total.toFixed(2)}</h3>
                    <button onClick={() => navigate('/entrega')}>Ir para Entrega</button>
                    <button onClick={() => dispatch(clearCart())} style={{ marginLeft: '10px' }}>
                        Limpar Carrinho
                    </button>
                </>
            )}
            <p style={{ marginTop: '20px' }}>
                <Link to="/">Voltar ao Cardápio</Link>
            </p>
        </Container>
    );
}