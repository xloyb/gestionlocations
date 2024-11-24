"use client"
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Hero = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };


  return (
    <div className="py-20 bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="container mx-auto px-6 md:px-12 justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
             Gestion  
              <span className="text-primary"> des </span>
              Location
            </h1>
            <p className="mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
              {showMore && (
                <>
                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </>
              )}
              {!showMore && (
                <>
                  <span className="line-clamp-3">
                  </span>
                </>
              )}
            </p>
            <button
              onClick={handleToggle}
              className={`flex mt-4 font-bold`}
            >
              {showMore ? (
                <>
                  Show Less <IoIosArrowUp className="ml-2 mt-1" />
                </>
              ) : (
                <>
                  Show More <IoIosArrowDown className="ml-2 mt-1" />
                </>
              )}
            </button>
            <div className="flex gap-2 mt-6">
              <a href="/c" className="btn btn-primary font-bold py-3 px-6 rounded-md">
                Get Started
              </a>
            
            </div>
          </div>
          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
            <img
              src="https://www.mydevify.com/assets/index.494ac568.png"
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;