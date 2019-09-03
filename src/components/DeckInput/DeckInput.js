import React from 'react';
import { connect } from 'react-redux';
import { addAvailableDecks } from 'src/actions';
import JSZip from 'jszip';

function DeckInput({ dispatch }) {
  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = async ({ target: { result: file } }) => {
      const deck = await JSZip.loadAsync(file);

      dispatch(addAvailableDecks(deck));
    };

    reader.readAsArrayBuffer(files[0]);
  };

  return (
    <input
      type="file"
      onChange={handleFile}
    />
  );
}

export default connect()(DeckInput);
