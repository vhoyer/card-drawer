import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {
  PlayDeckPage,
  UploadDeckPage,
} from './pages';

export default function App() {
  const [basename, setBasename] = useState('/');

  useEffect(() => {
    setBasename(window.location.pathname);
  }, []);


  return (
    <BrowserRouter basename={basename}>
      <h1>Card Drawer</h1>
      <Link to="/">Home</Link>
      <hr />

      <Route path="/" exact component={UploadDeckPage} />
      <Route path="/play/:id?" component={PlayDeckPage} />
    </BrowserRouter>
  );
};
