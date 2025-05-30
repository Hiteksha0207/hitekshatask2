import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  HeartIcon,
  ShareIcon,
  StarIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import 'swiper/css';
import 'swiper/css/navigation';

export default function LivePreview({ formData }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urls = formData.images?.map((file) => URL.createObjectURL(file)) || [];
    setImageUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [formData.images]);

  return (
    <div>
    <div className='mb-0'>
      <p className="text-md  text-[#532871] text-[20px] mb-0 flex justify-center">See your spa details live Here..!</p>
    </div>
    <div className="bg-white mt-5 rounded-xl shadow-xl w-full md:max-w-md relative h-fit overflow-hidden transition duration-300">
      
      <div className="flex justify-between items-center p-4 border-b">
        <p className="text-2xl font-bold text-purple-600">Trakky</p>
        <UserCircleIcon className="h-7 w-7 text-gray-600" />
      </div>

      {/* Carousel */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
        navigation
        modules={[Navigation]}
        className="w-full"
      >
        {imageUrls.length > 0 ? imageUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={url}
              alt={`img-${idx}`}
              className="w-full h-56 object-cover"
            />
          </SwiperSlide>
        )) : (
          <SwiperSlide>
            <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Image Uploaded
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {formData.spa_name || 'Your Spa Name'}
          </h2>
          <div className="flex gap-2">
            <HeartIcon className="h-5 w-5 text-pink-500" />
            <ShareIcon className="h-5 w-5 text-blue-500" />
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
          <StarIcon className="h-4 w-4 text-yellow-500" />
          <span>4.8</span> <span>•</span> <span>34 reviews</span>
        </div>

        <div className="text-sm text-gray-600 mt-1">
          📍 {formData.area || "Your Area"}, {formData.city || "Your City"}
        </div>

        <div className="text-sm text-gray-600 mt-1">
          ⏰ Timing: {formData.timing || "00:00"}
        </div>

        <div className="text-sm text-gray-600 mt-1 mb-2">
          💰 Price: ₹{formData.price || "0"}
        </div>

        <div className="text-xs text-purple-500 flex items-center gap-1 cursor-pointer hover:underline">
          <InformationCircleIcon className="w-4 h-4" />
          More info about this spa
        </div>
      </div>
    </div>
    </div>
  );
}
