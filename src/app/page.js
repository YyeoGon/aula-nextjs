import Image from "next/image";
import styles from "./page.module.css";

const Card = () => {
  return (
    <div>
      <h3>Aula introdução</h3>
      <h3>Aula Estilização</h3>
      <h3>Aula Componentes</h3>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>React com Next JS</h1>
      <h2> Aula de introdução</h2>
      <h3> Leiaute e Estilização</h3>
      <p> Nesta aula iremos entender o uso de CSS global e local.</p>
    </div>
  );
}


export default Home;