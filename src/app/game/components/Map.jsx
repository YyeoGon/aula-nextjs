'use client';

import { useEffect } from 'react';

const Map = ({ player, currentMap, maps, onMove, onChangeMap, onStartBattle, onOpenMenu }) => {
  const map = maps[currentMap];

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          onMove(0, -1);
          break;
        case 'ArrowDown':
          onMove(0, 1);
          break;
        case 'ArrowLeft':
          onMove(-1, 0);
          break;
        case 'ArrowRight':
          onMove(1, 0);
          break;
        case 'Enter':
          onOpenMenu();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onMove, onOpenMenu]);

  const renderTile = (x, y) => {
    if (x === player.x && y === player.y) {
      return <div key={`${x}-${y}`} className="tile player">P</div>;
    }
    const tile = map.tiles[y][x];
    return <div key={`${x}-${y}`} className={`tile ${tile}`}>{tile === 'grass' ? 'G' : tile === 'water' ? 'W' : '.'}</div>;
  };

  return (
    <div className="map">
      <h2>{map.name}</h2>
      <div className="map-grid" style={{ gridTemplateColumns: `repeat(${map.width}, 20px)` }}>
        {map.tiles.map((row, y) => (
          <div key={y} className="map-row">
            {row.map((_, x) => renderTile(x, y))}
          </div>
        ))}
      </div>
      <div className="controls">
        Use arrow keys to move, Enter for menu
      </div>
    </div>
  );
};

export default Map;