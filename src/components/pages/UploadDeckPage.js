import React from 'react';
import JSZip from 'jszip';

export default function UploadDeckPage() {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    return (
      <p>I'm sorry Dave, I'm afraid the File API is not fully supported by your browser.</p>
    );
  }

  const handleFile = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      console.log(event);

      // const zip = await JSZip.loadAsync(file);
      // console.log(zip);
    };

    reader.readAsArrayBuffer(files[0]);
  };

  return (
    <input
      type="file"
      onChange={handleFile}
    />
  );
};
