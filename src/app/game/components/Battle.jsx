'use client';

import { useState, useEffect } from 'react';

const Battle = ({ player, wildMonster, opponent, onEndBattle, onCatchMonster, battleLog, setBattleLog }) => {
  const [playerMonster, setPlayerMonster] = useState(player.monsters[0]);
  const [enemyMonster, setEnemyMonster] = useState(wildMonster || opponent.monsters[0]);
  const [turn, setTurn] = useState('player');
  const [menu, setMenu] = useState('main'); // main, fight, item, run

  const calculateDamage = (attacker, defender, move) => {
    const baseDamage = move.power;
    const typeMultiplier = 1; // Simplified, no type effectiveness
    const damage = Math.floor((baseDamage * attacker.attack / defender.defense) * typeMultiplier);
    return Math.max(1, damage);
  };

  const performMove = (move) => {
    const damage = calculateDamage(playerMonster, enemyMonster, move);
    setEnemyMonster(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    setBattleLog(prev => [...prev, `${playerMonster.name} used ${move.name}! It dealt ${damage} damage.`]);
    setTurn('enemy');
  };

  const enemyTurn = () => {
    const move = enemyMonster.moves[Math.floor(Math.random() * enemyMonster.moves.length)];
    const damage = calculateDamage(enemyMonster, playerMonster, move);
    setPlayerMonster(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    setBattleLog(prev => [...prev, `${enemyMonster.name} used ${move.name}! It dealt ${damage} damage.`]);
    setTurn('player');
  };

  useEffect(() => {
    if (turn === 'enemy') {
      setTimeout(enemyTurn, 1000);
    }
  }, [turn]);

  useEffect(() => {
    if (enemyMonster.hp <= 0) {
      setBattleLog(prev => [...prev, `${enemyMonster.name} fainted!`]);
      if (wildMonster) {
        // Chance to catch
        if (Math.random() < 0.5) {
          onCatchMonster(enemyMonster);
          setBattleLog(prev => [...prev, `You caught ${enemyMonster.name}!`]);
        }
      }
      setTimeout(onEndBattle, 2000);
    }
    if (playerMonster.hp <= 0) {
      setBattleLog(prev => [...prev, `${playerMonster.name} fainted! You blacked out.`]);
      setTimeout(onEndBattle, 2000);
    }
  }, [enemyMonster.hp, playerMonster.hp]);

  const handleFight = () => setMenu('fight');
  const handleItem = () => setMenu('item');
  const handleRun = () => onEndBattle();

  return (
    <div className="battle">
      <div className="battle-field">
        <div className="player-monster">
          <h3>{playerMonster.name}</h3>
          <p>HP: {playerMonster.hp}/{playerMonster.maxHp}</p>
        </div>
        <div className="enemy-monster">
          <h3>{enemyMonster.name}</h3>
          <p>HP: {enemyMonster.hp}/{enemyMonster.maxHp}</p>
        </div>
      </div>
      <div className="battle-log">
        {battleLog.slice(-5).map((log, i) => <p key={i}>{log}</p>)}
      </div>
      {turn === 'player' && (
        <div className="battle-menu">
          {menu === 'main' && (
            <div>
              <button onClick={handleFight}>Fight</button>
              <button onClick={handleItem}>Item</button>
              <button onClick={handleRun}>Run</button>
            </div>
          )}
          {menu === 'fight' && (
            <div>
              {playerMonster.moves.map((move, i) => (
                <button key={i} onClick={() => { performMove(move); setMenu('main'); }}>
                  {move.name}
                </button>
              ))}
              <button onClick={() => setMenu('main')}>Back</button>
            </div>
          )}
          {menu === 'item' && (
            <div>
              {/* Items */}
              <button onClick={() => setMenu('main')}>Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Battle;