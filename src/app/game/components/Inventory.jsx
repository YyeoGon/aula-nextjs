'use client';

const Inventory = ({ items, onUseItem, onClose }) => {
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <div className="items-list">
        {items.map((item, i) => (
          <div key={i} className="item">
            <span>{item.name} x{item.quantity}</span>
            <button onClick={() => onUseItem(item)}>Use</button>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Inventory;