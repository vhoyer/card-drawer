import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setStore } from 'src/actions';

const BYTES_QUOTA = 2*1024*1024 * 10;

// Access filesystem
const filesystem = new Promise((resolve, reject) => {
  window.webkitRequestFileSystem(window.PERSISTENT, BYTES_QUOTA, resolve, reject);
});

const decksDirectory = new Promise(async (resolve, reject) => {
  (await filesystem).root.getDirectory('decks', {create:true}, resolve, reject);
});

async function saveToFileSystem(state) {
  if (!window.webkitRequestFileSystem) return;
  if (!navigator.webkitPersistentStorage.requestQuota) return;

  // Request for storage
  await new Promise((r, j) => navigator.webkitPersistentStorage.requestQuota(BYTES_QUOTA, r, j));

  const createFileAsync = (file) => new Promise(async (r,j) => (await decksDirectory).getFile(file, {create:true}, r, j));

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

async function loadFromFileSystem(dispatch) {
  const store = {
    availableDecks: [],
  };

  const getFileAsync = (file) => new Promise(async (r,j) => {
    return (await decksDirectory)
      .getFile(file, {create:false}, (f) => f.file(r, j), j)
  });
  const readJsonAsync = (file) => new Promise((r,j) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => r(e.target.result);
    fileReader.onerror = j;
    fileReader.readAsText(file);
  });

  window.getFileAsync = getFileAsync;
  window.readJsonAsync = readJsonAsync;

  const meta = await getFileAsync('meta.json').then(readJsonAsync);

  for (let i = 0; i < meta.length; i++) {
    const deck = await getFileAsync(`deck${i}.json`).then(readJsonAsync);

    store.availableDecks.push(deck);
  }

  dispatch(setStore(store));
}

function StoreSyncFilesystem({ dispatch, store }) {
  const {deckState} = store;

  useEffect(() => {
    saveToFileSystem(deckState);
  }, [ deckState ]);

  useEffect(() => {
    loadFromFileSystem(dispatch);
  }, [ ]);

  return null;
}

export default connect((store) => ({store}))(StoreSyncFilesystem);
