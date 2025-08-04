import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 12px;
  }

  button {
    background: #ff6b00;
    border: none;
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 10px;
  }
`;

export default function CardProduto({ produto, onClick }) {
  return (
    <Card>
      <img src={produto.foto} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <button onClick={onClick}>Comprar</button>
    </Card>
  );
}