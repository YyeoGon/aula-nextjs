'use client'

import { useState, useEffect } from 'react';

export default function InputsComplexos() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [comentario, setComentario] = useState("");

    // Simulando carregamento de API (JSON)
    useEffect(() => {
        const mockAPI = ["Tecnologia", "Educação", "Saúde"];
        setCategorias(mockAPI);
    }, []);

    function handleSelecionaCategoria(categoria) {
        setCategoriaSelecionada(categoria);
        console.log(categoria);
    }

    return (
        <div>
            {/* Input Number, Date e Color */}
            <input type="number" placeholder="Idade" onChange={(e) => console.log(e.target.value)} />
            <input type="date" onChange={(e) => console.log(e.target.value)} />
            <input type="color" onChange={(e) => console.log(e.target.value)} />

            {/* Select preenchido via JSON */}
            <select value={categoriaSelecionada} onChange={e => handleSelecionaCategoria(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Textarea */}
            <textarea
                rows="4"
                placeholder="Sua bio..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
            />
        </div>
    );
}