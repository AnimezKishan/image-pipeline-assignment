import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Export = () => {
  const navigate = useNavigate();
  const { originalImage, maskImage } = useLocation().state;

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = maskImage;
    link.download = 'mask.jpeg';
    link.click();
  }

  return (
    <main className='w-full h-screen bg-[#171717] relative'>
        <nav className='h-[10vh] w-full flex items-center px-3'>
            <h1 className='text-white text-base sm:text-3xl font-bold'>Image Inpainting Widget</h1>
        </nav>

        <div className="uploadContainer w-full h-[90vh] flex flex-col gap-7 sm:gap-4 items-center justify-center">
            <div className='h-[80vh] w-full flex flex-col sm:flex-row gap-4 justify-around items-center'>
                <div className='relative w-[45vw] h-full'>
                    <span className='absolute top-2 left-1/2 -translate-x-1/2 text-white text-base sm:text-2xl'>
                        Original Image
                    </span>
                    <img 
                        src={originalImage} 
                        alt="Original Image" 
                        className='w-full h-full object-contain border-2 border-white rounded-md' 
                    />
                </div>
                <div className='relative w-[45vw] h-full'>
                    <span className='absolute top-2 left-1/2 -translate-x-1/2 text-white text-base sm:text-2xl'>
                        Mask Image
                    </span>
                    <img 
                        src={maskImage} 
                        alt="Mask Image" 
                        className='w-full h-full object-contain border-2 border-white rounded-md' 
                    />
                </div>
            </div>

            <div className='w-full h-[10vh] flex gap-5 justify-center items-center'>
                <button 
                className="px-4 py-2 bg-[#3e3e3e] text-white rounded-lg hover:bg-[#4a4a4a]"
                onClick={handleSave}
                >
                    Save Image
                </button>

                <button 
                className='px-4 py-2 bg-[#3e3e3e] text-white rounded-lg hover:bg-[#4a4a4a]' 
                onClick={() => navigate('/')}>
                    Return Home
                </button>
            </div>
        </div>
    </main>
  )
}

export default Export