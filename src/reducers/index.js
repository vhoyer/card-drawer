import { deckReducer } from './deckReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  deckState: deckReducer,
});
