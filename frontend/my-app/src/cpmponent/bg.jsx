import React from 'react';
import { Link } from 'react-router-dom';

function Bg() {
  return (
    <div className='fixed h-full w-screen z-[2]'>
      <h1 className='absolute text-[13vw] leading-none tracking-tight font-thin top-1/2 left-1/2 text-zinc-600 -translate-x-[50%] -translate-y-[50%] blinking-text'>
        farm
      </h1>
    </div>
  );
}

export default Bg;
