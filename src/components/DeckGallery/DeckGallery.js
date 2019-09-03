import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { asBase64ImageURI } from 'src/utils';

function DeckGallery({ availableDecks }) {
  const [deckCovers, setDeckCovers] = useState([]);

  useEffect(() => {
    const convertZipCollectionToCoverImages = (async (availableDecks) => {
      const getCoverAsync = asBase64ImageURI('Cover');
      const availableDeckCoversAsync = availableDecks.map(getCoverAsync);
      const newDeckCovers = await Promise.all(availableDeckCoversAsync);

      setDeckCovers(newDeckCovers);
    });

    convertZipCollectionToCoverImages(availableDecks);
  }, [ availableDecks ]);

  return (
    <div className="decks">
      {deckCovers.map(cover =>
        <img
          key={cover}
          src={cover}
          className="decks__cover"
        />)
      }
    </div>
  );
}

window.store = require('src/store').Store;

const mapStateToProps = ({ deckState }) => ({
  availableDecks: deckState.availableDecks,
});

export default connect(mapStateToProps)(DeckGallery);
