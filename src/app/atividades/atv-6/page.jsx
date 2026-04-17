'use client'

import { useState } from 'react';
import styles from './page.module.css';

const kantoPokemon = [
  { id: 1, name: 'Bulbasaur', type: 'Grama', emoji: '🌿', hp: 45, attack: 49 },
  { id: 4, name: 'Charmander', type: 'Fogo', emoji: '🔥', hp: 39, attack: 52 },
  { id: 7, name: 'Squirtle', type: 'Água', emoji: '💧', hp: 44, attack: 48 },
  { id: 25, name: 'Pikachu', type: 'Elétrico', emoji: '⚡', hp: 35, attack: 55 },
  { id: 39, name: 'Jigglypuff', type: 'Fada', emoji: '🎤', hp: 115, attack: 45 },
  { id: 52, name: 'Meowth', type: 'Normal', emoji: '🐱', hp: 40, attack: 45 },
  { id: 19, name: 'Rattata', type: 'Normal', emoji: '🐭', hp: 30, attack: 56 },
  { id: 54, name: 'Psyduck', type: 'Água', emoji: '🦆', hp: 50, attack: 52 },
  { id: 116, name: 'Horsea', type: 'Água', emoji: '🐴', hp: 30, attack: 40 },
  { id: 27, name: 'Sandshrew', type: 'Terra', emoji: '🏜️', hp: 50, attack: 75 },
  { id: 43, name: 'Oddish', type: 'Grama', emoji: '🍃', hp: 45, attack: 50 },
  { id: 133, name: 'Eevee', type: 'Normal', emoji: '🦊', hp: 55, attack: 55 }
];

const getRandomWild = (excludeId) => {
  const options = kantoPokemon.filter((pokemon) => pokemon.id !== excludeId);
  return options[Math.floor(Math.random() * options.length)];
};

const formatHp = (hp) => `${hp} HP`;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function Atividade06() {
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [wildPokemon, setWildPokemon] = useState(null);
  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(0);
  const [potions, setPotions] = useState(3);
  const [battleLog, setBattleLog] = useState([]);
  const [caught, setCaught] = useState([]);
  const [message, setMessage] = useState('Escolha seu Pokémon para iniciar a aventura!');

  const appendLog = (text) => {
    setBattleLog((prev) => [text, ...prev].slice(0, 8));
  };

  const choosePokemon = (pokemon) => {
    const starter = { ...pokemon };
    const wild = getRandomWild(starter.id);

    setPlayerPokemon(starter);
    setPlayerHP(starter.hp);
    setWildPokemon(wild);
    setEnemyHP(wild.hp);
    setPotions(3);
    setBattleLog([`Você escolheu ${starter.name}! Um ${wild.name} selvagem apareceu!`]);
    setMessage('Sua jornada Pokémon de Kanto começou!');
  };

  const spawnWild = () => {
    if (!playerPokemon) return;
    const nextWild = getRandomWild(playerPokemon.id);
    setWildPokemon(nextWild);
    setEnemyHP(nextWild.hp);
    setMessage(`Novo oponente: ${nextWild.name}!`);
    appendLog(`Um ${nextWild.name} selvagem apareceu!`);
  };

  const handleEnemyAttack = (currentPlayerHP) => {
    if (!wildPokemon) return currentPlayerHP;
    const damage = Math.max(1, Math.floor(wildPokemon.attack * (0.6 + Math.random() * 0.4)));
    const nextHp = clamp(currentPlayerHP - damage, 0, playerPokemon.hp);
    appendLog(`${wildPokemon.name} ataca ${playerPokemon.name} e causa ${damage} de dano.`);
    return nextHp;
  };

  const handleAttack = () => {
    if (!playerPokemon || !wildPokemon || playerHP <= 0 || enemyHP <= 0) return;

    const damage = Math.max(1, Math.floor(playerPokemon.attack * (0.7 + Math.random() * 0.4)));
    const newEnemyHP = clamp(enemyHP - damage, 0, wildPokemon.hp);
    setEnemyHP(newEnemyHP);
    appendLog(`${playerPokemon.name} usa ataque e causa ${damage} de dano em ${wildPokemon.name}.`);

    if (newEnemyHP <= 0) {
      appendLog(`Você derrotou ${wildPokemon.name}!`);
      setMessage(`Vitória! ${wildPokemon.name} foi derrotado.`);
      setCaught((prev) => [...prev, wildPokemon]);
      setTimeout(spawnWild, 600);
      return;
    }

    const nextPlayerHp = handleEnemyAttack(playerHP);
    setPlayerHP(nextPlayerHp);
    if (nextPlayerHp <= 0) {
      setMessage('Oh não! Você foi derrotado. Reinicie o jogo para tentar novamente.');
      appendLog('Seu Pokémon desmaiou. Fim do combate.');
    }
  };

  const handleHeal = () => {
    if (!playerPokemon || !wildPokemon || potions <= 0 || playerHP <= 0 || enemyHP <= 0) return;

    const healAmount = Math.max(1, Math.floor(playerPokemon.hp * 0.3));
    const nextHP = clamp(playerHP + healAmount, 0, playerPokemon.hp);
    setPlayerHP(nextHP);
    setPotions((prev) => prev - 1);
    appendLog(`${playerPokemon.name} usa poção e recupera ${nextHP - playerHP} HP.`);

    const nextPlayerHp = handleEnemyAttack(nextHP);
    setPlayerHP(nextPlayerHp);
    if (nextPlayerHp <= 0) {
      setMessage('Oh não! Você foi derrotado após usar poção. Reinicie o jogo.');
      appendLog('O adversário contra-atacou e você desmaiou.');
    }
  };

  const handleCatch = () => {
    if (!playerPokemon || !wildPokemon || playerHP <= 0 || enemyHP <= 0) return;
    const catchChance = enemyHP / wildPokemon.hp;
    const success = catchChance <= 0.3 || Math.random() < 0.4;

    if (success) {
      appendLog(`Você lançou uma Pokébola e capturou ${wildPokemon.name}!`);
      setCaught((prev) => [...prev, wildPokemon]);
      setMessage(`${wildPokemon.name} capturado com sucesso!`);
      setTimeout(spawnWild, 600);
      return;
    }

    appendLog(`A captura falhou e ${wildPokemon.name} atacou!`);
    const nextPlayerHp = handleEnemyAttack(playerHP);
    setPlayerHP(nextPlayerHp);
    if (nextPlayerHp <= 0) {
      setMessage('Oh não! Você foi derrotado ao tentar capturar.');
      appendLog('A batalha terminou com você derrotado.');
    }
  };

  const handleRun = () => {
    if (!playerPokemon || !wildPokemon || playerHP <= 0) return;
    appendLog(`Você fugiu de ${wildPokemon.name}. Um novo oponente apareceu!`);
    spawnWild();
  };

  const handleReset = () => {
    setPlayerPokemon(null);
    setWildPokemon(null);
    setPlayerHP(0);
    setEnemyHP(0);
    setPotions(3);
    setBattleLog([]);
    setMessage('Escolha seu Pokémon para iniciar a aventura!');
    setCaught([]);
  };

  const playerProgress = playerPokemon ? `${Math.round((playerHP / playerPokemon.hp) * 100)}%` : '0%';
  const enemyProgress = wildPokemon ? `${Math.round((enemyHP / wildPokemon.hp) * 100)}%` : '0%';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atividade 6 - Mini Jogo Pokémon Kanto</h1>
      <p className={styles.subtitle}>
        Escolha seu Pokémon inicial, lute contra oponentes selvagens e capture os primeiros Pokémon de Kanto.
      </p>

      {!playerPokemon ? (
        <div className={styles.chooseArea}>
          <h2>Escolha seu Pokémon inicial</h2>
          <div className={styles.pokemonGrid}>
            {kantoPokemon.slice(0, 4).map((pokemon) => (
              <button
                key={pokemon.id}
                type="button"
                className={styles.pokemonCard}
                onClick={() => choosePokemon(pokemon)}
              >
                <span className={styles.pokemonEmoji}>{pokemon.emoji}</span>
                <strong>{pokemon.name}</strong>
                <span className={styles.pokemonType}>{pokemon.type}</span>
                <span>{formatHp(pokemon.hp)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.battleArea}>
          <div className={styles.battlePanel}>
            <div className={styles.combatCard}>
              <div className={styles.cardHeader}>
                <span>{playerPokemon.emoji}</span>
                <strong>{playerPokemon.name}</strong>
              </div>
              <span className={styles.typeBadge}>{playerPokemon.type}</span>
              <div className={styles.hpBar}>
                <div className={styles.hpFill} style={{ width: playerProgress }} />
              </div>
              <p className={styles.hpText}>{formatHp(playerHP)} / {formatHp(playerPokemon.hp)}</p>
            </div>

            <div className={styles.combatCard}>
              <div className={styles.cardHeader}>
                <span>{wildPokemon.emoji}</span>
                <strong>{wildPokemon.name}</strong>
              </div>
              <span className={styles.typeBadge}>{wildPokemon.type}</span>
              <div className={styles.hpBar}>
                <div className={styles.enemyFill} style={{ width: enemyProgress }} />
              </div>
              <p className={styles.hpText}>{formatHp(enemyHP)} / {formatHp(wildPokemon.hp)}</p>
            </div>
          </div>

          <div className={styles.actionPanel}>
            <p className={styles.message}>{message}</p>
            <div className={styles.controls}>
              <button type="button" onClick={handleAttack} disabled={playerHP <= 0 || enemyHP <= 0}>Atacar</button>
              <button type="button" onClick={handleHeal} disabled={potions <= 0 || playerHP <= 0 || enemyHP <= 0}>
                Poção ({potions})
              </button>
              <button type="button" onClick={handleCatch} disabled={playerHP <= 0 || enemyHP <= 0}>Capturar</button>
              <button type="button" onClick={handleRun} disabled={playerHP <= 0}>Fugir</button>
              <button type="button" onClick={handleReset} className={styles.resetButton}>Reiniciar</button>
            </div>
          </div>
        </div>
      )}

      <section className={styles.capturedSection}>
        <h2>Pokémon capturados</h2>
        {caught.length > 0 ? (
          <div className={styles.caughtList}>
            {caught.map((pokemon, index) => (
              <span key={`${pokemon.id}-${index}`} className={styles.caughtItem}>
                {pokemon.emoji} {pokemon.name}
              </span>
            ))}
          </div>
        ) : (
          <p>Você ainda não capturou nenhum Pokémon.</p>
        )}
      </section>

      <section className={styles.pokedexSection}>
        <h2>Pokédex Kanto - Primeira Geração</h2>
        <div className={styles.pokedexGrid}>
          {kantoPokemon.map((pokemon) => (
            <article key={pokemon.id} className={styles.pokedexCard}>
              <span className={styles.pokemonEmoji}>{pokemon.emoji}</span>
              <div>
                <strong>{pokemon.name}</strong>
                <span>{pokemon.type}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
