import Link from 'next/link';

import styles from "./page.module.css"; 

function Home() {
<<<<<<< HEAD
    return  (
        <div className={styles.containerHome}>
        <div className={styles.containerListas}>
            <h1>Exemplos</h1>
            <Link href="/exemplos/ex-01">Exemplo 1</Link>
            <Link href="/exemplos/ex-02"> Exemplo 2</Link> 
            <Link href="/exemplos/ex-03"> Exemplo 3</Link> 
            <Link href="/exemplos/ex-04"> Exemplo 4</Link>
            <Link href="/exemplos/ex-05"> Exemplo 5</Link>
            <Link href="/exemplos/ex-06"> Exemplo 6</Link>
             </div>
           <div className={styles.containerListas}>
                <h1>Atividades</h1>
 <Link href="/atividades/atv-1"> Atividade 1</Link> 
 <Link href="/atividades/atv-2"> Atividade 2</Link> 
 <Link href="/atividades/atv-3"> Atividade 3</Link> 
 <Link href="/atividades/atv-4"> Atividade 4</Link>
 <Link href="/atividades/atv-6"> Atividade 6</Link>
 
        </div>
        </div>
    );
=======
  return (
    <div className={styles.containerHome} > 
      <div className={styles.containerListas}>
        <h1>Exemplos</h1>
        <Link href="/exemplos/ex-01">Exemplo 1 - Componente básico</Link>
        <Link href="/exemplos/ex-02">Exemplo 2 - Uso de CSS</Link>        
        <Link href="/exemplos/ex-03">Exemplo 3 - State</Link>        
        <Link href="/exemplos/ex-04">Exemplo 4 - Componentes</Link>        
        <Link href="/exemplos/ex-05">Exemplo 5 - Formulário</Link>        
        <Link href="/exemplos/ex-06">Exemplo 6 - Variações de entrada de dados</Link>        
      </div>
      <div className={styles.containerListas}>
        <h1>Atividades</h1>
        <Link href="/atividades/atv-1">Atividade 1 - Aplicação de CSS</Link>
        <Link href="/atividades/atv-2">Atividade 2 - State</Link>
        <Link href="/atividades/atv-3">Atividade 3 - Componentes</Link>
        <Link href="/atividades/atv-4">Atividade 4 - Formulário</Link>
        <Link href="/atividades/atv-5">Atividade 5 - Formulário</Link>
      </div>
    </div>
  );
>>>>>>> 0364078a232e65727ae5629260decb650bc716f0
}

export default Home;
