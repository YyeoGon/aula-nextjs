'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Dados dos monstros (151, mas simplificado para alguns)
const monsters = [
  { id: 1, name: 'Bulbasaur', type: 'Grass', hp: 45, attack: 49, defense: 49, speed: 45, moves: ['Tackle', 'Vine Whip'] },
  { id: 2, name: 'Ivysaur', type: 'Grass', hp: 60, attack: 62, defense: 63, speed: 60, moves: ['Tackle', 'Vine Whip', 'Razor Leaf'] },
  { id: 3, name: 'Venusaur', type: 'Grass', hp: 80, attack: 82, defense: 83, speed: 80, moves: ['Tackle', 'Vine Whip', 'Razor Leaf', 'Solar Beam'] },
  { id: 4, name: 'Charmander', type: 'Fire', hp: 39, attack: 52, defense: 43, speed: 65, moves: ['Scratch', 'Ember'] },
  { id: 5, name: 'Charmeleon', type: 'Fire', hp: 58, attack: 64, defense: 58, speed: 80, moves: ['Scratch', 'Ember', 'Flamethrower'] },
  // Adicionar mais conforme necessário
];

// Mapa simples: 0 = grama, 1 = água, 2 = cidade
const map = [
  [2, 0, 0, 0, 2],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [2, 0, 0, 0, 2],
];

// Itens
const items = [
  { id: 1, name: 'Potion', type: 'heal', amount: 20 },
  { id: 2, name: 'Pokeball', type: 'ball' },
];

export default function PokemonGame() {
  const [gameState, setGameState] = useState('map');
  const [playerPos, setPlayerPos] = useState({ x: 2, y: 2 });
  const [playerMonsters, setPlayerMonsters] = useState([{ ...monsters[0], currentHp: monsters[0].hp }]);
  const [inventory, setInventory] = useState([{ ...items[0], quantity: 5 }, { ...items[1], quantity: 10 }]);
  const [currentMonster, setCurrentMonster] = useState(0);
  const [enemyMonster, setEnemyMonster] = useState(null);
  const [message, setMessage] = useState('');
  const [battleMenu, setBattleMenu] = useState('main'); // main, fight, bag

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'map') {
        let newX = playerPos.x;
        let newY = playerPos.y;
        if (e.key === 'ArrowUp') newY--;
        if (e.key === 'ArrowDown') newY++;
        if (e.key === 'ArrowLeft') newX--;
        if (e.key === 'ArrowRight') newX++;
        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
          setPlayerPos({ x: newX, y: newY });
          if (map[newY][newX] === 0 && Math.random() < 0.1) {
            startBattle();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, gameState]);

  const startBattle = () => {
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    setEnemyMonster({ ...randomMonster, currentHp: randomMonster.hp });
    setGameState('battle');
    setBattleMenu('main');
  };

  const attack = (move) => {
    const playerMon = playerMonsters[currentMonster];
    const damage = Math.floor(playerMon.attack / 10) + 5;
    setEnemyMonster(prev => ({ ...prev, currentHp: Math.max(0, prev.currentHp - damage) }));
    setMessage(`${playerMon.name} used ${move}!`);
    if (enemyMonster.currentHp - damage <= 0) {
      setMessage('Enemy defeated!');
      setTimeout(() => setGameState('map'), 2000);
    } else {
      // Enemy attack
      setTimeout(() => {
        const enemyDamage = Math.floor(enemyMonster.attack / 10) + 5;
        setPlayerMonsters(prev => {
          const newMons = [...prev];
          newMons[currentMonster].currentHp = Math.max(0, newMons[currentMonster].currentHp - enemyDamage);
          return newMons;
        });
        setMessage(`${enemyMonster.name} attacked!`);
        setBattleMenu('main');
      }, 1000);
    }
  };

  const catchMonster = () => {
    const ball = inventory.find(item => item.name === 'Pokeball');
    if (ball && ball.quantity > 0) {
      setInventory(prev => prev.map(item => item.name === 'Pokeball' ? { ...item, quantity: item.quantity - 1 } : item));
      const catchRate = Math.random() < 0.5; // 50% chance for simplicity
      if (catchRate) {
        setPlayerMonsters(prev => [...prev, { ...enemyMonster }]);
        setMessage('Caught!');
        setTimeout(() => setGameState('map'), 2000);
      } else {
        setMessage('Failed to catch!');
        // Enemy attacks
        setTimeout(() => {
          const enemyDamage = Math.floor(enemyMonster.attack / 10) + 5;
          setPlayerMonsters(prev => {
            const newMons = [...prev];
            newMons[currentMonster].currentHp = Math.max(0, newMons[currentMonster].currentHp - enemyDamage);
            return newMons;
          });
          setMessage(`${enemyMonster.name} attacked!`);
          setBattleMenu('main');
        }, 1000);
      }
    } else {
      setMessage('No Pokeballs!');
    }
  };

  const useItem = (item) => {
    if (item.type === 'heal') {
      setPlayerMonsters(prev => {
        const newMons = [...prev];
        newMons[currentMonster].currentHp = Math.min(newMons[currentMonster].hp, newMons[currentMonster].currentHp + item.amount);
        return newMons;
      });
      setInventory(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
      setMessage(`Used ${item.name}!`);
      setBattleMenu('main');
    }
  };

  if (gameState === 'map') {
    return (
      <div className={styles.game}>
        <h1>Pokémon Game</h1>
        <div className={styles.map}>
          {map.map((row, y) => (
            <div key={y} className={styles.row}>
              {row.map((tile, x) => (
                <div key={x} className={`${styles.tile} ${tile === 0 ? styles.grass : tile === 1 ? styles.water : styles.city} ${playerPos.x === x && playerPos.y === y ? styles.player : ''}`}>
                  {playerPos.x === x && playerPos.y === y ? 'P' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p>Use arrow keys to move. Walk on grass to battle!</p>
      </div>
    );
  }

  if (gameState === 'battle') {
    const playerMon = playerMonsters[currentMonster];
    return (
      <div className={styles.battle}>
        <h2>Battle!</h2>
        <div className={styles.monsters}>
          <div>Player: {playerMon.name} HP: {playerMon.currentHp}/{playerMon.hp}</div>
          <div>Enemy: {enemyMonster.name} HP: {enemyMonster.currentHp}/{enemyMonster.hp}</div>
        </div>
        <p>{message}</p>
        {battleMenu === 'main' && (
          <div className={styles.menu}>
            <button onClick={() => setBattleMenu('fight')}>Fight</button>
            <button onClick={() => setBattleMenu('bag')}>Bag</button>
            <button onClick={() => setBattleMenu('catch')}>Catch</button>
            <button onClick={() => setGameState('map')}>Run</button>
          </div>
        )}
        {battleMenu === 'fight' && (
          <div className={styles.moves}>
            {playerMon.moves.map(move => (
              <button key={move} onClick={() => { attack(move); setBattleMenu('main'); }}>{move}</button>
            ))}
            <button onClick={() => setBattleMenu('main')}>Back</button>
          </div>
        )}
        {battleMenu === 'bag' && (
          <div className={styles.items}>
            {inventory.filter(item => item.quantity > 0).map(item => (
              <button key={item.id} onClick={() => useItem(item)}>{item.name} ({item.quantity})</button>
            ))}
            <button onClick={() => setBattleMenu('main')}>Back</button>
          </div>
        )}
        {battleMenu === 'catch' && (
          <div>
            <button onClick={catchMonster}>Throw Pokeball</button>
            <button onClick={() => setBattleMenu('main')}>Back</button>
          </div>
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
}