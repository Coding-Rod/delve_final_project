// Dialog.jsx
import { useDropzone } from 'react-dropzone';
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';

export function Dialog({ setNewChat }) {
  const [error, setError] = useState(null);
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    axios.post('YOUR_BACKEND_ENDPOINT', formData)
      .then(response => {
        console.log('Success:', response.data);
        setNewChat(false);
      })
      .catch(error => {
        setError(error.message)
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

  return (
    <>
      <div className="opacity-50 w-full h-full bg-secondary fixed inset-0 z-8888" />
      <div className="fixed inset-0 flex items-center justify-center z-9999" >
        <Card className="w-1/3 p-20 border-1 border-gray-400" >
          <CardHeader className="text-2xl font-semibold p-4">
            Upload PDF
          </CardHeader>
          <CardBody>
            <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded p-5 text-center cursor-pointer h-52 d-flex items-center justify-center">
              <input {...getInputProps()} />
              <p>Drag 'n' drop a PDF file here, or click to select one</p>
            </div>
          </CardBody>
          {error && <CardFooter>
            <p className="text-danger w-full bg-red-100 px-6 py-4 rounded-xl">{error}</p>
          </CardFooter>}
        </Card>
      </div>
    </>
  );
};
