'use client'
import styles from "./page.module.css"
import { useState } from "react";

export default function Exemplo03() {  

    const [num, setNum] = useState(100);

    function handleIncrementa () {
        setNum(num + 1);
    }

    return (
       
        <div className={styles.Contador}>
            <label>{`Contador: ${num}`}</label>            
            <label onClick={() => handleIncrementa()} className={styles.button}>+1</label>
      </div>
    );
}