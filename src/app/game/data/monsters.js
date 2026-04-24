// monsters.js
export const monsters = [
  {
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    hp: 45,
    maxHp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    moves: [
      { name: 'Tackle', power: 40, type: 'Normal' },
      { name: 'Vine Whip', power: 45, type: 'Grass' },
    ],
  },
  {
    id: 2,
    name: 'Ivysaur',
    type: 'Grass',
    hp: 60,
    maxHp: 60,
    attack: 62,
    defense: 63,
    speed: 60,
    moves: [
      { name: 'Tackle', power: 40, type: 'Normal' },
      { name: 'Vine Whip', power: 45, type: 'Grass' },
      { name: 'Razor Leaf', power: 55, type: 'Grass' },
    ],
  },
  // ... Add more monsters up to 151
];

// For simplicity, generate the rest programmatically
for (let i = 3; i <= 151; i++) {
  monsters.push({
    id: i,
    name: `Monster${i}`,
    type: ['Grass', 'Fire', 'Water', 'Electric'][Math.floor(Math.random() * 4)],
    hp: Math.floor(Math.random() * 100) + 20,
    maxHp: Math.floor(Math.random() * 100) + 20,
    attack: Math.floor(Math.random() * 100) + 20,
    defense: Math.floor(Math.random() * 100) + 20,
    speed: Math.floor(Math.random() * 100) + 20,
    moves: [
      { name: 'Tackle', power: 40, type: 'Normal' },
      { name: 'Scratch', power: 40, type: 'Normal' },
    ],
  });
}