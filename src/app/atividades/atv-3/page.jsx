'use client'

import { useState } from 'react';

import Botao from './botao';

import styles from './page.module.css';

function Atividade03() {
    const [acaoSelecionada, setAcaoSelecionada] = useState('');

    return (
        <div className={styles.container}>
            <h1>Atividade 3 - Sistema de Ações</h1>
            
            <div className={styles.acaoContainer}>
                <h2>Ação selecionada:</h2>
                <div className={styles.acaoDisplay}>
                    {acaoSelecionada && <span className={styles.acao}>{acaoSelecionada}</span>}
                </div>
            </div>

            <div className={styles.botoesContainer}>
                <Botao 
                    texto="Cadastrar" 
                    aoClicar={() => setAcaoSelecionada('Cadastrar')} 
                    cor="cadastrar" 
                />
                <Botao 
                    texto="Listar" 
                    aoClicar={() => setAcaoSelecionada('Listar')} 
                    cor="listar" 
                />
                <Botao 
                    texto="Editar" 
                    aoClicar={() => setAcaoSelecionada('Editar')} 
                    cor="editar" 
                />
                <Botao 
                    texto="Excluir" 
                    aoClicar={() => setAcaoSelecionada('Excluir')} 
                    cor="excluir" 
                />
                <Botao 
                    texto="Cancelar" 
                    aoClicar={() => setAcaoSelecionada('')} 
                    cor="cancelar" 
                />
            </div>
        </div>
    );
}

export default Atividade03;
