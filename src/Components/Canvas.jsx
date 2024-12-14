import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

const Canvas = () => {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [brushRadius, setBrushRadius] = useState(8);
  
  // Function to clear the canvas
  const handleClear = () => {
    canvasRef.current.clear();
  };

  // Function to undo last stroke
  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleSave = () => {
    if (canvasRef.current) {
      // Store the current canvas settings
      const currentCanvas = canvasRef.current.canvasContainer.children[1];
      const context = currentCanvas.getContext('2d');
      const imageData = context.getImageData(0, 0, currentCanvas.width, currentCanvas.height);
      
      // Create a temporary canvas with black background
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = currentCanvas.width;
      tempCanvas.height = currentCanvas.height;
      const tempContext = tempCanvas.getContext('2d');
      
      // Fill with black background
      tempContext.fillStyle = '#000000';
      tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw the white lines from original canvas
      tempContext.putImageData(imageData, 0, 0);
      
      // Get the data URL from temp canvas
      const maskData = tempCanvas.toDataURL('image/jpeg');
      
      // Navigate to export route with both URLs
      navigate('/export', {
        state: {
          originalImage: imageUrl,
          maskImage: maskData
        }
      });
    }
  };

  return (
    <main className='w-full h-screen bg-[#171717] relative'>
      <nav className='h-[10vh] w-full flex flex-col sm:flex-row items-center justify-between px-3'>
        <h1 className='text-white text-base sm:text-3xl font-bold'>Image Inpainting Widget</h1>
        
        {/* Brush Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-white">Brush Size:</label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushRadius} 
              onChange={(e) => setBrushRadius(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-white">{brushRadius}px</span>
          </div>
          
          <button 
            onClick={handleUndo}
            className="px-4 py-2 bg-[#3e3e3e] text-white rounded-lg hover:bg-[#4a4a4a]"
          >
            Undo
          </button>
          
          <button 
            onClick={handleClear}
            className="px-4 py-2 bg-[#3e3e3e] text-white rounded-lg hover:bg-[#4a4a4a]"
          >
            Clear
          </button>
        </div>
      </nav>

      <div className="w-full h-[90vh] flex flex-col gap-7 sm:gap-4 items-center justify-center">
        <div className="relative">
          {/* Background Image */}
          <img 
            src={imageUrl} 
            alt="Uploaded Image" 
            className='w-[90vw] h-[75vh] rounded-md aspect-auto object-contain absolute opacity-50'
          />
          
          {/* Drawing Canvas */}
          <CanvasDraw
            ref={canvasRef}
            brushColor="#FFFFFF"
            backgroundColor="rgba(0,0,0,0)"
            brushRadius={brushRadius}
            lazyRadius={0}
            canvasWidth={window.innerWidth * 0.9}
            canvasHeight={window.innerHeight * 0.75}
            hideGrid={true}
            className="rounded-md border-2 border-gray-300"
            style={{
              background: 'transparent',
            }}
          />
        </div>

        <button 
        onClick={handleSave}
        className="px-4 py-2 bg-[#3e3e3e] text-white rounded-lg hover:bg-[#4a4a4a]"
        >
            Next
        </button>
      </div>
    </main>
  );
};

export default Canvas;