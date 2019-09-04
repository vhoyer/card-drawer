export default function deckCardsToArray(deck) {
  const range52 = Array.from({length:52}, (_, i) => `${i+1}`.padStart(2, '0'));

  const getFace = i => deck[`Card_${i}`];

  return range52.map(getFace);
}
