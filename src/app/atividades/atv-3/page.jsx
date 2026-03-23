'use client'
import styles from "./page.module.css"
import Link from "next/link"

const nomes = [
  { nome: "Julia Paganni", cor: "#ff6f91" },
  { nome: "Maria Clara", cor: "#ffca3a" },
  { nome: "Valentina", cor: "#8ac926" },
  { nome: "Bia Chaves", cor: "#1982c4" },
  { nome: "Luana", cor: "#6a4c93" },
  { nome: "Danieli Kerber", cor: "#ff595e" }
]

export default function Atv3() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Atividade 3</h1>
        <p>Galeria de nomes especiais</p>
      </div>

      <div className={styles.cards}>
        {nomes.map((item, index) => (
          <article key={item.nome} className={styles.card} style={{ '--card-color': item.cor }}>
            <span className={styles.badge}>{index + 1}</span>
            <h2>{item.nome}</h2>
            <p>Uma homenagem animada para essa pessoa incrível.</p>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.backButton}>← Voltar para Início</Link>
      </div>
    </div>
  )
}
