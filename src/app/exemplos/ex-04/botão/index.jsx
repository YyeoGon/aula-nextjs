import styles from './index.module.css';

function Botao({ texto, aoClicar, acao }) {
    const className = `${styles.botao} ${acao === '+' ? styles.mais : styles.menos}`;

    return (
        <button type="button" className={className} onClick={aoClicar}>
            {texto}
        </button>
    );
}

export default Botao;