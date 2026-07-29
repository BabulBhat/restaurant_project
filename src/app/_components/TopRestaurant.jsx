import Image from "next/image";
import RestaurantImage from "../../../public/image/restaurant.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TopRestaurant() {
  return (
    <div className="top_Restaurant bg-black px-4 py-24 bg-[url(../../public/image/background_Restaurant.png)] bg-cover bg-no-repeat">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="block text-xl font-light uppercase py-2 text-white">
            Top Restaurants
          </span>
          <h2 className="text-4xl font-semibold text-yellow-600 capitalize">
            <span className="subHeading relative">
              Popular Restaurants
              <span className="subHeadingUnderline"></span>
            </span>
          </h2>
        </div>
        <div className="pt-14">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            allowTouchMove={false}
            spaceBetween={15}
            slidesPerView={1}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <div className="card bg-[#f5f5f5] rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={RestaurantImage}
                    alt="Restaurant House"
                    width={576}
                    height={576}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <a href="" className="p-3 block">
                  <p className="py-1 text-gray-500 font-semibold">
                    <i className="fa-solid fa-stopwatch text-red-800 mr-1"></i>
                    <span className="text-sm">12:00 am - 11:59 pm</span>
                  </p>
                  <h5 className="py-1 text-2xl font-semibold text-gray-800 tracking-tighter">
                    Organic Arcadian Food
                  </h5>

                  <div className="rating py-1 text-gray-400">
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star-half-stroke hover:text-yellow-600"></i>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-[#f5f5f5] rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={RestaurantImage}
                    alt="Restaurant House"
                    width={576}
                    height={576}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <a href="" className="p-3 block">
                  <p className="py-1 text-gray-500 font-semibold">
                    <i className="fa-solid fa-stopwatch text-red-800 mr-1"></i>
                    <span className="text-sm">12:00 am - 11:59 pm</span>
                  </p>
                  <h5 className="py-1 text-2xl font-semibold text-gray-800 tracking-tighter">
                    Organic Arcadian Food
                  </h5>

                  <div className="rating py-1 text-gray-400">
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star-half-stroke hover:text-yellow-600"></i>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-[#f5f5f5] rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={RestaurantImage}
                    alt="Restaurant House"
                    width={576}
                    height={576}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <a href="" className="p-3 block">
                  <p className="py-1 text-gray-500 font-semibold">
                    <i className="fa-solid fa-stopwatch text-red-800 mr-1"></i>
                    <span className="text-sm">12:00 am - 11:59 pm</span>
                  </p>
                  <h5 className="py-1 text-2xl font-semibold text-gray-800 tracking-tighter">
                    Organic Arcadian Food
                  </h5>

                  <div className="rating py-1 text-gray-400">
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star-half-stroke hover:text-yellow-600"></i>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-[#f5f5f5] rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={RestaurantImage}
                    alt="Restaurant House"
                    width={576}
                    height={576}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <a href="" className="p-3 block">
                  <p className="py-1 text-gray-500 font-semibold">
                    <i className="fa-solid fa-stopwatch text-red-800 mr-1"></i>
                    <span className="text-sm">12:00 am - 11:59 pm</span>
                  </p>
                  <h5 className="py-1 text-2xl font-semibold text-gray-800 tracking-tighter">
                    Organic Arcadian Food
                  </h5>

                  <div className="rating py-1 text-gray-400">
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star-half-stroke hover:text-yellow-600"></i>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-[#f5f5f5] rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={RestaurantImage}
                    alt="Restaurant House"
                    width={576}
                    height={576}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <a href="" className="p-3 block">
                  <p className="py-1 text-gray-500 font-semibold">
                    <i className="fa-solid fa-stopwatch text-red-800 mr-1"></i>
                    <span className="text-sm">12:00 am - 11:59 pm</span>
                  </p>
                  <h5 className="py-1 text-2xl font-semibold text-gray-800 tracking-tighter">
                    Organic Arcadian Food
                  </h5>

                  <div className="rating py-1 text-gray-400">
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star hover:text-yellow-600"></i>
                    <i className="fa-solid fa-star-half-stroke hover:text-yellow-600"></i>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
