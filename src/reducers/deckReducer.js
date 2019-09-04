import { addAvailableDecks } from 'src/actions/actionTypes';

async function saveToFileSystem(state) {
  if (!window.webkitRequestFileSystem) return;
  if (!navigator.webkitPersistentStorage.requestQuota) return;

  const BYTES_QUOTA = 2*1024*1024 * state.availableDecks.length;

  // Request for storage
  await new Promise((r, j) => navigator.webkitPersistentStorage.requestQuota(BYTES_QUOTA, r, j));

  // Access filesystem
  const filesystem = await new Promise((resolve, reject) => {
    window.webkitRequestFileSystem(window.PERSISTENT, BYTES_QUOTA, resolve, reject);
  });

  const decksDirectory = await new Promise((resolve, reject) => {
    filesystem.root.getDirectory('decks', {create:true}, resolve, reject);
  });

  const createFileAsync = (file) => new Promise((r,j) => decksDirectory.getFile(file, {create:true}, r, j));

  window.state = state;
  window.getFileAsync = (file) => new Promise((r,j) => decksDirectory.getFile(file, {create:true}, (f) => f.file(r, j), j));
  window.readFileAsync = (file) => new Promise((r,j) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => r(e.target.result);
    fileReader.onerror = j;
    fileReader.readAsText(file);
  });

  const writeJson = (obj) => (writer) => {
    writer.write(new Blob([JSON.stringify(obj)], {type: 'text/json'}));
  };

  const metaFile = await createFileAsync('meta.json');
  metaFile.createWriter(writeJson({
    length: state.availableDecks.length,
  }));

  metaFile.createWriter((writer) => {
    const data = new Blob([JSON.stringify({
      length: state.availableDecks.length,
    })], {type: 'text/json'})

    writer.write(data);
  });

  state.availableDecks.forEach(async (deck, index) => {
    const file = await createFileAsync(`deck${index}.json`);
    file.createWriter(writeJson(deck));
  });
}

const initialState = {
  availableDecks: [],
};

function reduce(state, action) {
  switch (action.type) {
    case addAvailableDecks:
      return {
        ...state,
        availableDecks: [...state.availableDecks, action.payload],
      };
    default:
      return state;
  }
}

export const deckReducer = (state = initialState, action) => {
  const newState = reduce(state, action);

  saveToFileSystem(newState);

  return newState;
}


