import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAvailableDecks } from 'src/actions';
import JSZip from 'jszip';

function myState(initial) {
  const [state, setState] = useState(initial);

  const assignState = (assign) => {
    return setState({
      ...state,
      ...assign,
    });
  };

  return [state, assignState];
}

function DeckInput({ dispatch }) {
  const [state, assignState] = myState({
    stage: 'TO_UPLOAD',
  });

  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = async ({ target: { result: file } }) => {
      const deck = await JSZip.loadAsync(file);

      dispatch(addAvailableDecks(deck));
    };

    reader.onloadstart = () => assignState({ stage: 'PROCESSING' });
    reader.onloadend = () => assignState({ stage: 'TO_UPLOAD' });
    reader.onprogress = ({ loaded, total }) => assignState({ loaded, total });

    reader.readAsArrayBuffer(files[0]);
  };

  if (state.stage === 'TO_UPLOAD') {
    return (
      <input
        type="file"
        onChange={handleFile}
      />
    );
  } else if (state.stage === 'PROCESSING') {
    return (
      <div>
        <span>Processing...</span>
        <progress
          value={state.loaded}
          max={state.total}
        />
      </div>
    );
  } else {
    return (
      <pre>What!?</pre>
    );
  }
}

export default connect()(DeckInput);
