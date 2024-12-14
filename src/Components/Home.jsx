import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Upload from './Upload';

const Home = () => {
  const loaderText = useRef(null);
  const loader = useRef(null);
  const nav = useRef(null);
  const uploadContainer = useRef(null);
  const [counter, setCounter] = useState(0);
  const { contextSafe } = useGSAP();
  const random = gsap.utils.random(6, 10, 1, true);
  const randomTimer = gsap.utils.random(200, 300, 50, true);

  useEffect(() => {
    // Check if loader has already been shown this session
    const hasLoaderBeenShown = sessionStorage.getItem('loaderShown');

    if (hasLoaderBeenShown) {
      // If loader was already shown, skip to final state
      loader.current.style.display = 'none';
      nav.current.style.opacity = 1;
      uploadContainer.current.style.opacity = 1;
      return;
    }

    const t = setInterval(() => {
      loaderText.current.textContent = counter;   
      if (counter >= 100) {
        clearInterval(t);
        loaderAnimation();
        // Mark loader as shown in this session
        sessionStorage.setItem('loaderShown', 'true');
      } else {
        setCounter((prevCounter) => Math.min(prevCounter + random(), 100));
      }
    }, randomTimer());

    return () => clearInterval(t); // Clean up the interval
  }, [counter]);

  const loaderAnimation = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(loader.current, {
      delay: 0.3,
      scale: .6, 
      ease: "power2.in",
    })
    .to(loader.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
      ease: "power4.inOut",
    })
    .to(nav.current, {
      opacity: 1,
      ease: "power1.inOut",
    }, "-=0.2")
    .to(uploadContainer.current, {
      opacity: 1,
      ease: "power1.inOut",
    }, "-=0.2")
    .to(loader.current, {
      display: 'none',
    });
  });

  return (
    <main className='w-full h-screen bg-[#171717] relative'>
      <div 
        ref={loader} 
        className="loader absolute w-full h-full bg-[#2e2e2e] flex justify-center items-center" 
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <h1 className='text-white text-2xl'>
          <span ref={loaderText} className='text-white text-7xl font-bold'>0</span>%
        </h1>
      </div>
      <nav ref={nav} className='h-[10vh] w-full flex items-center px-3 opacity-0'>
        <h1 className='text-white text-base sm:text-3xl font-bold'>Image Inpainting Widget</h1>
      </nav>

      <div ref={uploadContainer} className="uploadContainer w-full h-[90vh] flex flex-col gap-7 sm:gap-4 items-center justify-center opacity-0">
        <Upload />
      </div>
    </main>
  )
}

export default Home