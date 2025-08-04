import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
    position: fixed;
    top: 0;
    right: ${({ open }) => (open ? "0" : "-400px")};
    width: 400px;
    height: 100%;
    background: white;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 20px;
    overflow-y: auto;
`;

export default function SidebarCarrinho({ open, onClose, itens }) {
    return (
        <Sidebar open={open}>
            <h2>Carrinho</h2>
            <button onClick={onClose} style={{ float: "right", marginBottom: "20px" }}>
                Fechar
            </button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {itens.map((item) => (
                    <li key={item.id} style={{ marginBottom: "15px" }}>
                        <img
                            src={item.imagem}
                            alt={item.nome}
                            style={{ width: "60px", marginRight: "10px" }}
                        />
                        {item.nome}
                    </li>
                ))}
            </ul>
        </Sidebar>
    );
}