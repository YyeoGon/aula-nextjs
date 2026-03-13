import Image from "next/image";
import styles from "./page.module.css";

function Home() {
    return  (
        <div className={styles.containerHome}>
        <div className={styles.containerListas}>
            <h1>Exemplos</h1>
             </div>
           <div className={styles.containerListas}>
                <h1>Atividades</h1>
        </div>
        </div>
    );
}
export default Home;
