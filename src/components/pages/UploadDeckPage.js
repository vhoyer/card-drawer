import './UploadDeckPage.scss';
import React, { useState } from 'react';
import JSZip from 'jszip';

export default function UploadDeckPage() {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    return (
      <p>I'm sorry Dave, I'm afraid the File API is not fully supported by your browser.</p>
    );
  }

  const [decks, setDecks] = useState([]);
  const [deckCovers, setDeckCovers] = useState([]);

  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = async ({ target: { result: file } }) => {
      const deck = await JSZip.loadAsync(file);

      const newDecks = [...decks, deck]
      setDecks(newDecks);

      const makeUriImg = async deck => `data:image/jpg;base64,${await deck.file('Cover.jpg').async('base64')}`
      const newDeckCovers = await Promise.all(newDecks.map(makeUriImg));
      setDeckCovers(newDeckCovers);
    };

    reader.readAsArrayBuffer(files[0]);
  };

  return (
    <div>
      <strong>Add deck:</strong><br/>
      <input
        type="file"
        onChange={handleFile}
      />

      <div className="decks">
        {deckCovers.map(cover =>
          <img
            key={cover}
            src={cover}
            className="decks__cover"
          />)}
      </div>
    </div>
  );
};
