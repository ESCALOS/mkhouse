import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination';
import '@/styles/review.css'
import { Pagination } from 'swiper/modules';

export default ({reviews = []}) => {
    const breakpoints = {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
    }
    return (
        <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={breakpoints}
        modules={[Pagination]}
        className='h-96 w-full'
      >
        {
            reviews.map(({customer, raiting, review}, index) => {
                const stars = Array(raiting).fill(0);
                return (
                    <SwiperSlide key={index}>
                        <div className="relative flex flex-col items-start">
      <div className="relative bg-gray-800 text-white text-sm py-2 px-4 rounded-md ml-8 mt-2">
        {review}
        <div style={{
            width: 0,
            height: 0,
            borderTop: "100px solid red",
            borderRight: "100px solid transparent"

        }}></div>
      </div>
      <div className="ml-2 mt-4 text-gray-800 font-bold bg-white p-1 rounded">
        {customer}
      </div>
    </div>
                </SwiperSlide>)
            })
        }
      </Swiper>
    </>
  );
}