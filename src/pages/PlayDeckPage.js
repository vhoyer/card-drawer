import './PlayDeckPage.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shuffleArray, deckCardsToArray } from 'src/utils';

function PlayDeckPage({ match, history, decks }) {
  const deckId = match.params.id;
  const deck = decks[deckId];

  if (!deck) {
    history.push('/');
  }

  const cardFaces = deckCardsToArray(deck);
  const [openCard, setOpenCard] = useState(null);
  const [availableIndexes, setAvailableIndexes] = useState(
    shuffleArray(Array.from({length:52}, (_, i) => i))
  );

  const drawCard = () => {
    setOpenCard(availableIndexes.shift());
    setAvailableIndexes(availableIndexes);
  };

  return (
    <div className="deck-table">
      <button onClick={drawCard}>
        <img
          className="deck-table__closed-cards"
          src={deck['Back']}
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
