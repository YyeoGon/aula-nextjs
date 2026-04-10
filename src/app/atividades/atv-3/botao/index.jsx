import styles from './index.module.css';

function Botao({ texto, aoClicar, cor }) {
    return (
        <button
            className={`${styles.botao} ${styles[cor]}`}
            onClick={aoClicar}
        >
            {texto}
        </button>
    );
}

export default Botao;
