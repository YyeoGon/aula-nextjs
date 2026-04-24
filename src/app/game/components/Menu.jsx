'use client';

const Menu = ({ player, onClose, onOpenInventory }) => {
  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-options">
        <button onClick={onOpenInventory}>Inventory</button>
        <button>Save</button>
        <button>Options</button>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="player-info">
        <p>Money: ${player.money}</p>
        <p>Badges: {player.badges.length}</p>
        <p>Monsters: {player.monsters.length}</p>
      </div>
    </div>
  );
};

export default Menu;