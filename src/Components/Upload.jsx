import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Upload = () => {

  const [file, setFile] = useState(null);
  const fileUploaded = useRef(null);
  const dropZoneRef = useRef(null);
  const navigate = useNavigate();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file);
      // Navigate to canvas route with the file URL
      navigate('/canvas', { state: { imageUrl: fileUrl } });
    } else {
      // Trigger file input if no file is selected
      document.getElementById('dropzone-file').click();
    }
  };

  useEffect(() => {
    if (file) {
      fileUploaded.current.classList.remove('hidden');
      fileUploaded.current.textContent = `${file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name} Uploaded.`;
    }
  }, [file]);

  return (
    <>
      <h1 className='text-white text-2xl'>Upload an Image (JPEG/PNG format)</h1>

      <div className="flex items-center justify-center w-[55vw] sm:w-[30vw] h-fit">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#2a2a2a] hover:bg-[#3e3e3e]"
          ref={dropZoneRef}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG or JPG</p>
            <p ref={fileUploaded} className='pt-5 text-sm text-green-300 font-bold text-wrap hidden'>File Uploaded</p>
          </div>
          <input id="dropzone-file" type="file" accept='image/*' className="hidden" onChange={onFileChange} />
        </label>
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2.5 bg-[#3e3e3e] hover:bg-[#4a4a4a] text-white font-medium rounded-lg 
        transition-colors duration-200 ease-in-out border border-gray-600 hover:border-gray-500
        flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        Upload
      </button>
    </>
  )
}

export default Upload