import * as types from './actionTypes';

export const addAvailableDecks = value => ({
  type: types.addAvailableDecks,
  payload: value,
});

export const setStore = value => ({
  type: types.setStore,
  payload: value,
});
