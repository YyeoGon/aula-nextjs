'use client';

import { useState, useEffect } from 'react';
import Map from './Map';
import Battle from './Battle';
import Menu from './Menu';
import Inventory from './Inventory';
import { monsters } from '../data/monsters';
import { maps } from '../data/maps';
import { items } from '../data/items';
import '../styles/game.css';

const Game = () => {
  const [gameState, setGameState] = useState('map'); // map, battle, menu, inventory
  const [player, setPlayer] = useState({
    x: 5,
    y: 5,
    direction: 'down',
    monsters: [monsters[0]], // Start with Bulbasaur
    items: [],
    badges: [],
    money: 3000,
  });
  const [currentMap, setCurrentMap] = useState('pallet-town');
  const [wildMonster, setWildMonster] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  const startBattle = (monster) => {
    setWildMonster(monster);
    setGameState('battle');
  };

  const endBattle = () => {
    setWildMonster(null);
    setOpponent(null);
    setBattleLog([]);
    setGameState('map');
  };

  const catchMonster = (monster) => {
    setPlayer(prev => ({
      ...prev,
      monsters: [...prev.monsters, monster],
    }));
  };

  const useItem = (item) => {
    // Implement item usage
  };

  const movePlayer = (dx, dy) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    const map = maps[currentMap];
    if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height) {
      setPlayer(prev => ({
        ...prev,
        x: newX,
        y: newY,
      }));
      const tile = map.tiles[newY][newX];
      if (tile === 'grass' && Math.random() < 0.1) { // 10% chance
        const wild = monsters[Math.floor(Math.random() * monsters.length)];
        startBattle({ ...wild, hp: wild.maxHp });
      }
    }
  };

  const changeMap = (newMap) => {
    setCurrentMap(newMap);
    // Reset player position based on map
  };

  return (
    <div className="game">
      {gameState === 'map' && (
        <Map
          player={player}
          currentMap={currentMap}
          maps={maps}
          onMove={movePlayer}
          onChangeMap={changeMap}
          onStartBattle={startBattle}
          onOpenMenu={() => setGameState('menu')}
        />
      )}
      {gameState === 'battle' && (
        <Battle
          player={player}
          wildMonster={wildMonster}
          opponent={opponent}
          onEndBattle={endBattle}
          onCatchMonster={catchMonster}
          battleLog={battleLog}
          setBattleLog={setBattleLog}
        />
      )}
      {gameState === 'menu' && (
        <Menu
          player={player}
          onClose={() => setGameState('map')}
          onOpenInventory={() => setGameState('inventory')}
        />
      )}
      {gameState === 'inventory' && (
        <Inventory
          items={player.items}
          onUseItem={useItem}
          onClose={() => setGameState('menu')}
        />
      )}
    </div>
  );
};

export default Game;