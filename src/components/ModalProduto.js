import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  text-align: center;
`;

export default function ModalProduto({ produto, onClose }) {
  const dispatch = useDispatch();

  if (!produto) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <img src={produto.foto} alt={produto.nome} style={{ width: '100%' }} />
        <h3>{produto.nome}</h3>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <button
          style={{ marginTop: '10px' }}
          onClick={() => {
            dispatch(addItem(produto));
            onClose();
          }}
        >
          Adicionar ao Carrinho
        </button>
      </Modal>
    </Overlay>
  );
}