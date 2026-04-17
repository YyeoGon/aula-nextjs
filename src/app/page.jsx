import Link from "next/link";
import styles from "./page.module.css";

function Home() {
    return  (
        <div className={styles.containerHome}>
        <div className={styles.containerListas}>
            <h1>Exemplos</h1>
            <Link href="/exemplos/ex-01">Exemplo 1</Link>
            <Link href="/exemplos/ex-02"> Exemplo 2</Link> 
            <Link href="/exemplos/ex-03"> Exemplo 3</Link> 
            <Link href="/exemplos/ex-04"> Exemplo 4</Link>
            <Link href="/exemplos/ex-05"> Exemplo 5</Link>
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
}
export default Home;
