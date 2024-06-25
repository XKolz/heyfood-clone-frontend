'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Slide1 from '@/app/assets/Slide1.png'
import Slide2 from '@/app/assets/Slide2.png'
import Slide3 from '@/app/assets/Slide3.png'
import Slide4 from '@/app/assets/Slide3.png'
import Slide5 from '@/app/assets/Slide3.png'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];

export default function BannerSlides() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='relative bg-[white] pt-10 px-3'>
      <div className='flex justify-center items-center'>
        <button 
          onClick={handlePrevClick} 
          className='p-2 bg-[#e0dcdc] text-black rounded-2xl'
        >
          <FaArrowLeft />
        </button>
        <div className='flex gap-2 px-2'>
          <div className='hidden sm:flex gap-2'>
            <Image src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            <Image src={slides[(currentIndex + 1) % slides.length]} alt={`Slide ${(currentIndex + 2)}`} />
            <Image src={slides[(currentIndex + 2) % slides.length]} alt={`Slide ${(currentIndex + 3)}`} />
          </div>
          <div className='flex sm:hidden'>
            <Image src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </div>
        </div>
        <button 
          onClick={handleNextClick} 
          className='p-2 bg-[#e0dcdc] text-black rounded-2xl'
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}
