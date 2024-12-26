import React from 'react';
import { Link } from 'react-router-dom';

function front() {
  return (
    <div className='absolute flex flex-wrap gap-20 top-20 justify-around p-10 left-0 z-[3] w-full'>
      {/* Hero Section */}
      <section className='bg-zinc-600 text-white text-center py-20 rounded-3xl'>
        <div className='max-w-7xl mx-auto px-4'>
          <h1 className='text-5xl font-extrabold leading-tight mb-4'>
            Welcome to Our Amazing Platform
          </h1>
          <p className='text-xl mb-8'>
            Discover beautiful cards, resources, and much more. Your go-to place for all your needs.
          </p>
          <div className='flex justify-center space-x-4'>
            <Link
              to='/login'
              className='inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-400 transition-all'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='inline-block bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition-all'
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id='cards' className='py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* <h2 className='text-3xl font-bold text-center mb-12'>Our Featured Cards</h2> */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <img
                src='https://img.freepik.com/free-vector/gradient-rural-landscape-background_52683-126752.jpg?ga=GA1.1.1836494235.1700195027&semt=ais_hybrid'
                alt='Winter Card'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <img
                src='https://img.freepik.com/free-vector/scene-with-rainfall-field_1308-73940.jpg?ga=GA1.1.1836494235.1700195027&semt=ais_hybrid'
                alt='Summer Card'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <img
                src='https://img.freepik.com/free-vector/winter-landscape-concept-hand-drawn_23-2148351066.jpg?ga=GA1.1.1836494235.1700195027&semt=ais_hybrid'
                alt='Rain Card'
                className='w-full h-full object-cover'
              />
              <div className='p-6'>
                <h3 className='text-2xl font-semibold mb-3'>Rainy Days</h3>
                <p className='text-gray-600 mb-4'>
                  Embrace the rainy season with our handpicked items to enjoy the weather.
                </p>
                <a href='#' className='text-blue-600 hover:text-blue-500 font-medium'>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className='bg-gray-800 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-semibold mb-4'>Ready to Explore More?</h2>
          <p className='text-lg mb-8'>
            Join us today and start your journey with our exclusive offerings.
          </p>
        </div>
      </section>
    </div>
  );
}

export default front;
