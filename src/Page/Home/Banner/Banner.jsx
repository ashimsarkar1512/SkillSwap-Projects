// components/BannerSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const banners = [
  {
    image: '/image1.jpg', // ✅ এখানে public লিখার দরকার নেই
    title: 'Welcome to Our Website',
  },
  {
    image: '/image2.jpg',
    title: 'Discover New Features',
  },
  {
    image: '/image3.jpg',
    title: 'Join Us Today',
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-5">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="bg-black/60 text-center px-4 py-2 rounded-md text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                {banner.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
