'use client'

import { useState } from 'react';
import styles from './page.module.css';

function Atividade04() {
  const [inputValue, setInputValue] = useState({
    id: '',
    quantidade: '',
    produto: ''
  });
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [removingIds, setRemovingIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.produto || !inputValue.quantidade) return;

    const novoItem = { ...inputValue, id: Date.now() };
    setDadosCadastrados([...dadosCadastrados, novoItem]);

    setInputValue({ id: '', quantidade: '', produto: '' });
  };

  const handleRemove = (id) => {
    if (removingIds.includes(id)) return;

    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setDadosCadastrados((prev) => prev.filter((item) => item.id !== id));
      setRemovingIds((prev) => prev.filter((removendoId) => removendoId !== id));
    }, 250);
  };

  return (
    <div className={styles.container}>
      <h1>Formulário básico</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputValue.quantidade}
          onChange={(e) => setInputValue({ ...inputValue, quantidade: e.target.value })}
          placeholder="Qtd"
        />
        <input
          type="text"
          value={inputValue.produto}
          onChange={(e) => setInputValue({ ...inputValue, produto: e.target.value })}
          placeholder="Produto..."
        />
        <button type="submit">Adicionar</button>
      </form>

      {dadosCadastrados.length > 0 && <h2>Lista de compras</h2>}

      <ul className={styles.lista}>
        {dadosCadastrados.map((item) => (
          <li
            key={item.id}
            className={`${styles.linha} ${removingIds.includes(item.id) ? styles.remover : ''}`}
          >
            <span className={styles.conteudo}>
              {item.quantidade}x {item.produto}
            </span>
            <button
              type="button"
              className={styles.removerBotao}
              onClick={() => handleRemove(item.id)}
              aria-label={`Remover ${item.produto}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Atividade04;
