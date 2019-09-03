const initialState = {
  currentDeck: null,
  availableDecks: [],
};

export const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_DECKS':
      return {
        ...state,
        availableDecks: action.payload,
      };
    case 'SET_CURRENT_DECK':
      return {
        ...state,
        currentDeck: action.payload,
      };
    default:
      return state;
  }
}
