import React from 'react';

function Card(props) {
  return (
    <div className="relative w-60 h-72 rounded-[20px] overflow-hidden  drop-shadow-[0_5px_5px_rgba(0,0,0)] group ">
      
      {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.bgimg})` }}></div>

      <div className="cardBtn absolute bottom-0 h-32 w-full bg-black bg-opacity-75 text-white px-5 py-2 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-00 ease-in-out">
        <h1 className="text-lg font-bold mb-2">{props.cropName}</h1>
        <p className="text-sm mb-4">{props.cropInfo}</p>
        <div className="btn w-full flex justify-between">
          <button className="bg-white text-black rounded px-4 py-2 font-semibold hover:bg-green-200">
            <a href={props.info} target="_blank" rel="noopener noreferrer">Info</a>
          </button>
          <button className="bg-white text-black rounded px-4 py-2 font-semibold hover:bg-green-200">
            <a href={props.video} target="_blank" rel="noopener noreferrer">Video</a>
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Card;
