import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const SlidingBanner = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextImg = () => {
    if(desktopImages.length -1 > currentImg) {
        setCurrentImg(prev => prev + 1)
    }
    else {
        return
    }
  }
  const prevtImg = () => {
    if(currentImg !== 0) {
        setCurrentImg(prev => prev - 1)
    }
    else {
        return
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if(desktopImages.length -1 >  currentImg) {
        nextImg()
      } else {
        setCurrentImg(0)
      }
    }, 5000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentImg ])
  return (
    <div className="container mx-auto px-4 rounded overflow-hidden">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-4xl text-slate-600">
            <button onClick={prevtImg} className="rounded-fill p-1 hover:scale-125 hover:text-slate-800 transition-all">
              <FaAngleLeft />
            </button>
            <button onClick={nextImg} className="rounded-fill p-1 hover:scale-125 hover:text-slate-800 transition-all">
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={img}
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                <img src={img} alt="" className="object-cover w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={img}
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                <img src={img} alt="" className="object-cover w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlidingBanner;
