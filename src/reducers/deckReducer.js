import { addAvailableDecks } from 'src/actions/actionTypes';

const initialState = {
  availableDecks: [],
};

export const deckReducer = (state = initialState, action) => {
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
