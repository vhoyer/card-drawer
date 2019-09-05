import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {
  PlayDeckPage,
  UploadDeckPage,
} from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <h1>Card Drawer</h1>
      <Link to="/">Home</Link>
      <hr />

      <Route path="/" exact component={UploadDeckPage} />
      <Route path="/play/:id?" component={PlayDeckPage} />
    </BrowserRouter>
  );
};
