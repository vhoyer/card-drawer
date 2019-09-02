import React, { useState } from 'react';
import JSZip from 'jszip';

export default function UploadDeckPage() {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    return (
      <p>I'm sorry Dave, I'm afraid the File API is not fully supported by your browser.</p>
    );
  }

  const [decks, setDecks] = useState([]);

  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = async ({ target: { result: file } }) => {
      const deck = await JSZip.loadAsync(file);
      console.log(deck);
      console.log(deck.file('Cover.jpg'));

      setDecks([...decks, deck]);
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
        {decks.map(async (deck, index) => <img key={index} src={await deck.file('Cover.jpg').async('')}/>)}
      </div>
    </div>
  );
};
