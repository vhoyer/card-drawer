import { addAvailableDecks } from 'src/actions/actionTypes';

const initialState = {
  availableDecks: [],
};


const reducer = (state, action) => {
  switch (action.type) {
    case addAvailableDecks:
      return {
        ...state,
        availableDecks: [...state.availableDecks, action.payload],
      };
    default:
      return state;
  }
};

export const deckReducer = (state = initialState, action) => {
  const newState = reducer(state, action);

  console.log(newState);

  return newState;
}
