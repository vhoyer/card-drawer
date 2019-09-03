import './PlayDeckPage.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asBase64ImageURI } from 'src/utils';

function PlayDeckPage({ match, history, decks }) {
  const deckId = match.params.id;

  if (!deckId || !decks[deckId]) {
    history.push('/');
  }

  const [currentDeck, setCurrentDeck] = useState({});
  const [back, setBack] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCurrentDeck(decks[deckId]);
  }, [ decks, deckId ]);

  useEffect(() => {
    const setImagesAsync = async () => {
      setBack(await asBase64ImageURI('Back')(currentDeck))
    };

    setImagesAsync()
  }, [ currentDeck ])

  return (
    <div className="deck-table">
      <img
        className="deck-table__closed-cards"
        src={back}
      />
    </div>
  );
};

const mapStateToProps = ({ deckState }) => ({
  decks: deckState.availableDecks,
});

export default connect(mapStateToProps)(withRouter(PlayDeckPage));
