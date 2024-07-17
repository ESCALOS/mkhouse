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
        style={{ padding: ".5rem .5rem 0 .5rem" }}
      >
        {
            reviews.map(({customer, review}, index) => {
                return (
                    <SwiperSlide key={index}>
                      <div style={{ 
                        filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))",
                        cursor: "col-resize"
                       }}>
                        <div className="bg-white w-full pb-12" style={{ 
                          clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%,40% 75%, 25% 90%, 25% 75%, 0% 75%)',
                          }} >
                          <div className='px-4 pt-4 pb-8'>
                            <p className="line-clamp-[8] text-sm text-zinc-500">{review}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 -mt-4 text-zinc-600 font-medium p-1 rounded">
                        {customer}
                      </div>
                    </SwiperSlide>)
            })
        }
      </Swiper>
    </>
  );
}