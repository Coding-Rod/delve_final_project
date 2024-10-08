// Dialog.jsx
import React from 'react';
import { useDropzone } from 'react-dropzone';

export function Dialog() {
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded p-5 text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag 'n' drop a PDF file here, or click to select one</p>
    </div>
  );
};
