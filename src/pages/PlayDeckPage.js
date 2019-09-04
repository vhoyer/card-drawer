import './PlayDeckPage.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asBase64ImageURI, shuffleArray } from 'src/utils';

function PlayDeckPage({ match, history, decks }) {
  const deckId = match.params.id;

  if (!deckId || !decks[deckId]) {
    history.push('/');
  }

  const [availableIndexes, setAvailableIndexes] = useState(
    shuffleArray(Array.from({length:52}, (_, i) => i))
  );
  const [deck, setCurrentDeck] = useState({});
  const [back, setBack] = useState('');
  const [cardFaces, setCardFaces] = useState([]);
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => {
    setCurrentDeck(decks[deckId]);
  }, [ decks, deckId ]);

  useEffect(() => {
    const setImagesAsync = async () => {
      const range52 = Array.from({length:52}, (_, i) => `${i+1}`.padStart(2, '0'));
      const getFaceAsync = i => asBase64ImageURI(`Card_${i}.png`)(deck);
      const unshuffledFaces = await Promise.all(range52.map(getFaceAsync));
      setCardFaces(shuffleArray(unshuffledFaces));

      setBack(await asBase64ImageURI('Back.png')(deck))
    };

    if (deck) {
      setImagesAsync();
    }
  }, [ deck ]);

  const drawCard = () => {
    setOpenCard(availableIndexes.shift());
    setAvailableIndexes(availableIndexes);
  };

  return (
    <div className="deck-table">
      <button onClick={drawCard}>
        <img
          className="deck-table__closed-cards"
          src={back}
        />
      </button>

      {openCard != null &&
        <img
          className="deck-table__opened-cards"
          src={cardFaces[openCard]}
        />
      }
    </div>
  );
};

const mapStateToProps = ({ deckState }) => ({
  decks: deckState.availableDecks,
});

export default connect(mapStateToProps)(withRouter(PlayDeckPage));
