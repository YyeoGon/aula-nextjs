'use client'
import styles from "./page.module.css"
import { useState } from "react";

export default function Exemplo03() {  

    const [num, setNum] = useState(100);

    function handleIncrementa () {
        setNum(num + 1);
    }

    function handleDecrementa () {
        setNum(num - 1);
    }
    function handleDivide () {
        setNum(num / 2);
    }
    function handleMultiplica () {
        setNum(num * 2);
    }

    return (
       
        <div className={styles.Contador}>
            <label>{`Contador: ${num}`}</label>
            <div className={styles.buttonContainer}>
                <label onClick={() => handleDecrementa()} className={styles.buttonDecrement}>-1</label>
                <label onClick={() => handleIncrementa()} className={styles.button}>+1</label>
                 <label onClick={() => handleDivide()} className={styles.buttonDivider}>/2</label>
                  <label onClick={() => handleMultiplica()} className={styles.buttonMultiplier}>*2</label>
            </div>
            </div>

    );
}