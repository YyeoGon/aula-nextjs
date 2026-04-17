'use client'

import { useState } from 'react';

import styles from './page.module.css';

export default function Exemplo05() {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    // Array histórico de logins
    const [historico, setHistorico] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (login && senha) {
            const horario = new Date();
            const novaEntrada = `Usuário: ${login} - Horário ${horario.toLocaleString()}`;

            setHistorico((prevHistorico) => [...prevHistorico, novaEntrada]);
            setLogin('');
            setSenha('');
        }
    };




    return (
        <div className={styles.container}>

            <h1>Exemplo 5 - Formulário</h1>
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className={styles.formulario}>
                <input
                    name="login"
                    type="text"
                    placeholder='usuário'
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <input
                    name="senha"
                    type="password"
                    placeholder='senha'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit">Acessar sistema</button>
            </form>

            <div className={styles.historico}>
                <h3>Histórico de Logins</h3>
                
                {
                    historico.map( item => 
                        <p key={item}>{item}</p>
                    )
                }

            </div>
        </div>
    );
}