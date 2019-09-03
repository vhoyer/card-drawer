import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function PlayDeckPage({ history, deck }) {
  if (!deck) {
    history.push('/');
  }

  return (
    <img src="placehold.it/150" />
  );
};

const mapStateToProps = (state) => ({
  deck: state.deckState.currentDeck,
});

export default connect(mapStateToProps)(withRouter(PlayDeckPage));
