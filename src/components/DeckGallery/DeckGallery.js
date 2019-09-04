import './DeckGallery.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function DeckGallery({ availableDecks }) {
  const deckCovers = availableDecks.map(i => i['Cover'])

  return (
    <div className="decks">
      {deckCovers.map((cover, index) =>
        <Link
          key={cover}
          to={`/play/${index}`}
        >
          <img
            src={cover}
            className="decks__cover"
          />
        </Link>)
      }
    </div>
  );
}

window.store = require('src/store').Store;

const mapStateToProps = ({ deckState }) => ({
  availableDecks: deckState.availableDecks,
});

export default connect(mapStateToProps)(DeckGallery);
