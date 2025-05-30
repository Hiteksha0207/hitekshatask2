
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import {
  HeartIcon,
  ShareIcon,
  StarIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

export default function LivePreview({ formData }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urls = formData.images?.map((file) => URL.createObjectURL(file)) || [];
    setImageUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [formData.images]);

  return (
    <div className="bg-white mt-10 rounded-xl shadow-lg w-full md:max-w-md relative h-110 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-2 pb-0">
        <p className="text-[28px] font-bold text-purple-700">Trakky</p>
        <UserCircleIcon className="h-6 w-6 text-gray-700" />
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="relative"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`preview-${index}`}
                className="w-full h-56 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {imageUrls.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            more photos
          </div>
        )}
      </div>

      {/* Spa Info Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-800">
            {formData.spa_name || 'Spa Name'}
          </h2>
          <div className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5 text-gray-500" />
            <ShareIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <StarIcon className="h-4 w-4 text-yellow-500" />
          <span>4.5</span>
          <span>•</span>
          <span>20 reviews</span>
        </div>
        <p className="text-sm text-gray-600">
          {formData.area || 'Area'}, {formData.city || 'City'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Timing: {formData.timing || '00:00'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Price: ₹{formData.price || '0'}
        </p>
      </div>
    </div>
  );
}
