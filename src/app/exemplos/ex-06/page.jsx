'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { UserPlus, CheckCircle, Edit, ArrowRight, ArrowLeft, Plus, Trash2, Save, Shirt } from 'lucide-react';

import Camisa from './camisa';

export default function CadastroEquipe() {
    const [etapa, setEtapa] = useState(1);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [categorias, setCategorias] = useState([]);

    // Dados da Equipe
    const [equipe, setEquipe] = useState({
        nome: '',
        corPrimaria: '#000000',
        temReserva: 'nao',
        corSecundaria: '#ffffff',
        email: '',
        categoria: '',
    });

    // Lista dinâmica de integrantes
    const [integrantes, setIntegrantes] = useState([]);

    useEffect(() => {
        setCategorias(["Futsal", "Volei", "Basquete"]);
    }, []);

    const handleEquipeChange = (e) => {
        const { name, value } = e.target;
        setEquipe(prev => ({ ...prev, [name]: value }));
    };

    const addMember = () => {
        setIntegrantes([...integrantes, { nome: '', nascimento: '', numero: '' }]);
    };

    const updateMember = (index, field, value) => {
        const newArr = [...integrantes];
        newArr[index][field] = value;
        setIntegrantes(newArr);
    };

    const deleteMember = (index) => {
        setIntegrantes(integrantes.filter((_, i) => i !== index));
    };

    const resetAll = () => {
        setEtapa(1);
        setEquipe({ nome: '', corPrimaria: '#000000', temReserva: 'nao', corSecundaria: '#ffffff', email: '', categoria: '' });
        setIntegrantes([]);
        setMostrarModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <p className={styles.brand}>Sistema de Torneios</p>

                {/* ETAPA 1: EQUIPE */}
                {etapa === 1 && (
                    <div className={styles.fade}>
                        <h2 className={styles.title}><UserPlus size={28} /> Cadastro de Equipe</h2>

                        <div className={styles.field}>
                            <label className={styles.label}>Nome da equipe</label>
                            <input name="nome" className={styles.input} value={equipe.nome} onChange={handleEquipeChange} placeholder="Ex: Galáticos FC" />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Cor Principal</label>
                                <input name="corPrimaria" type="color" className={styles.color} value={equipe.corPrimaria} onChange={handleEquipeChange} />
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Uniforme reserva?</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioOption}>
                                        <input type="radio" name="temReserva" value="sim" checked={equipe.temReserva === 'sim'} onChange={handleEquipeChange} />
                                        <span>Sim</span>
                                    </label>
                                    <label className={styles.radioOption}>
                                        <input type="radio" name="temReserva" value="nao" checked={equipe.temReserva === 'nao'} onChange={handleEquipeChange} />
                                        <span>Não</span>
                                    </label>
                                </div>
                            </div>

                            {equipe.temReserva === 'sim' && (
                                <div className={styles.field}>
                                    <label className={styles.label}>Cor Secundária</label>
                                    <input name="corSecundaria" type="color" className={styles.color} value={equipe.corSecundaria} onChange={handleEquipeChange} />
                                </div>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>E-mail do responsável</label>
                            <input name="email" type="email" className={styles.input} value={equipe.email} onChange={handleEquipeChange} placeholder="email@exemplo.com" />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Categoria</label>
                            <select name="categoria" className={styles.select} value={equipe.categoria} onChange={handleEquipeChange}>
                                <option value="">Selecione...</option>
                                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <button onClick={() => setEtapa(2)} className={styles.btnNext}>
                            Próximo: Integrantes <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* ETAPA 2: INTEGRANTES */}
                {etapa === 2 && (
                    <div className={styles.fade}>
                        <h2 className={styles.title}>Integrantes</h2>
                        <div className={styles.memberList}>
                            {integrantes.map((m, i) => (
                                <div key={i} className={styles.memberItem}>
                                    <input placeholder="Nome" className={styles.input} value={m.nome} onChange={e => updateMember(i, 'nome', e.target.value)} />
                                    <input type="date" className={styles.input} value={m.nascimento} onChange={e => updateMember(i, 'nascimento', e.target.value)} />
                                    <input placeholder="Nº" type="number" className={styles.inputShort} value={m.numero} onChange={e => updateMember(i, 'numero', e.target.value)} />
                                    <button onClick={() => deleteMember(i)} className={styles.btnTrash}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addMember} className={styles.btnAdd}><Plus size={18} /> Adicionar Integrante</button>

                        <div className={styles.footerBtns}>
                            <button onClick={() => setEtapa(1)} className={styles.btnBack}><ArrowLeft size={18} /> Voltar</button>
                            <button onClick={() => setEtapa(3)} className={styles.btnNext} disabled={integrantes.length === 0}>Revisar Dados</button>
                        </div>
                    </div>
                )}

                {/* ETAPA 3: REVISÃO */}
                {etapa === 3 && (
                    <div className={styles.fade}>
                        <h2 className={styles.title}><Edit size={24} /> Revisão</h2>
                        <div className={styles.summary}>
                            <p><strong>Equipe:</strong> {equipe.nome} ({equipe.categoria})</p>
                            <p><strong>Responsável:</strong> {equipe.email}</p>
                            <div>
                            <p><strong>Uniforme: </strong> {/*{equipe.corPrimaria} {equipe.temReserva === 'sim' && ` / ${equipe.corSecundaria}`}*/}</p>
                            <Camisa 
                                fillColor={equipe.corPrimaria} 
                                strokeColor="#000000" 
                            />
                            {equipe.temReserva === 'sim' ? <Camisa 
                                fillColor={equipe.corSecundaria} 
                                strokeColor="#000000" 
                            /> : null }
                            </div>
                            <hr />
                            <p><strong>Membros ({integrantes.length}):</strong></p>
                            <div className={styles.smallList}>
                                {integrantes.map((m, i) => <div key={i}>#{m.numero} - {m.nome}</div>)}
                            </div>
                        </div>
                        <div className={styles.footerBtns}>
                            <button onClick={() => setEtapa(2)} className={styles.btnBack}>Editar</button>
                            <button onClick={() => setMostrarModal(true)} className={styles.btnSave}>Finalizar Cadastro <Save size={18} /></button>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL FINAL */}
            {mostrarModal && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <CheckCircle size={60} color="#4ade80" />
                        <h3>Tudo Pronto!</h3>
                        <p>A equipe <strong>{equipe.nome}</strong> foi salva.</p>
                        <button onClick={resetAll} className={styles.btnNext}>Confirmar</button>
                    </div>
                </div>
            )}
        </div>
    );
}