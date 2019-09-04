import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAvailableDecks } from 'src/actions';
import { asBase64ImageURI } from 'src/utils';
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

  const convertZipToDeck = async (zip) => {
    const fileNames = Object.keys(zip.files);
    console.log(fileNames);

    const getImagesAsync = (file) => asBase64ImageURI(file)(zip);

    const allFiles = await Promise.all(fileNames.map(getImagesAsync));

    const deck = fileNames.reduce((acc, cur, index) => {
      acc[cur] = allFiles[index];

      return acc;
    }, {});

    dispatch(addAvailableDecks(deck));
    assignState({ stage: 'TO_UPLOAD' });
  };

  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onloadstart = () => assignState({ stage: 'PROCESSING', loaded: 0 });
    reader.onprogress = ({ loaded, total }) => assignState({ loaded, total });
    reader.onloadend = () => assignState({ stage: 'DECOMPRESSING' });
    reader.onload = async ({ target: { result: file } }) => {
      JSZip.loadAsync(file)
        .then(convertZipToDeck);
    };

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
  } else if (state.stage === 'DECOMPRESSING') {
    return (
      <div>
        <span>Uncompressing...</span>
      </div>
    );
  } else {
    return (
      <pre>What!?</pre>
    );
  }
}

export default connect()(DeckInput);
