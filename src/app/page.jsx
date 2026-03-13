import Link from "next/link";
import styles from "./page.module.css";

function Home() {
    return  (
        <div className={styles.containerHome}>
        <div className={styles.containerListas}>
            <h1>Exemplos</h1>
            <Link href="/exemplos/ex-01">Exemplo 1</Link>
            <Link href="/exemplos/ex-02"> Exemplo 2</Link> 
             </div>
           <div className={styles.containerListas}>
                <h1>Atividades</h1>
        </div>
        </div>
    );
}
export default Home;
