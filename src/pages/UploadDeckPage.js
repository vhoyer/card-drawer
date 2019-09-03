import './UploadDeckPage.scss';
import React, { useState } from 'react';
import DeckInput from 'src/components/DeckInput';
import DeckGallery from 'src/components/DeckGallery';

function UploadDeckPage() {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    return (
      <p>I'm sorry Dave, I'm afraid the File API is not fully supported by your browser.</p>
    );
  }

  return (
    <div>
      <strong>Add deck:</strong><br/>
      <DeckInput />

      <DeckGallery />
    </div>
  );
};

export default UploadDeckPage;
