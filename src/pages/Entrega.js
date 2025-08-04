import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    padding: 40px 80px;
`;

export default function Entrega() {
    const [form, setForm] = useState({ rua: '', numero: '', cidade: '' });
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();

        fetch('https://ebac-fake-api.vercel.app/api/efood/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                produtos: cart.items,
                endereco: form
            })
        })
            .then(res => res.json())
            .then(data => {
                navigate('/confirmacao', { state: data });
            });
    };

    return (
        <Container>
            <h1>Endereço de Entrega</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div>
                    <label>Rua:</label>
                    <input type="text" name="rua" value={form.rua} onChange={handleChange} required />
                </div>
                <div>
                    <label>Número:</label>
                    <input type="text" name="numero" value={form.numero} onChange={handleChange} required />
                </div>
                <div>
                    <label>Cidade:</label>
                    <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required />
                </div>
                <button type="submit" style={{ marginTop: '20px' }}>
                    Concluir Pedido
                </button>
            </form>
        </Container>
    );
}