"use client";
import Image from "next/image";
import Layout from "./_components/Layout";
import Banner from "./_components/Banner";
import TopRestaurant from "./_components/TopRestaurant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Image
import ads from "../../public/image/ads.png";
import ads2 from "../../public/image/ads2.png";
import client from "../../public/image/testimonials_one.jpg";
import Pizza from "../../public/image/pizz.png";
import Cake from "../../public/image/cake.jpg";
import deliveryBoy from "../../public/image/delivery_Boy.png";
import { useSelector } from "react-redux";

export default function Home() {
  const { data, loading } = useSelector((state) => state.allcategory);
  // console.log(data);

  return (
    <Layout>
      <Banner />
      {/* Our Food Start */}
      <div className="ourFood py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center">
            <span className="block text-xl font-light uppercase py-2 text-gray-800">
              Top Foods
            </span>
            <h2 className="text-4xl font-semibold text-red-800 capitalize">
              <span className="subHeading relative">
                Our Categories
                <span className="subHeadingUnderline"></span>
              </span>
            </h2>
          </div>
          <div className="grid grid-cols gap-10 pt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!loading
              ? data.map((item, index) => {
                  // console.log(item);

                  return (
                    <div className="cardCategories" key={index}>
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src={item?.categoryImg}
                          alt="Categories Image"
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h3 className="text-2xl font-bold text-red-800 mb-1">
                          {item?.categoryname}
                        </h3>
                        <p className="text-gray-800 tracking-tighter">
                          15 Restaurant Available
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      {/* Our Food End */}

      {/* Top Restaurant Start */}
      <TopRestaurant />
      {/* Top Restaurant End */}

      {/* Ads Start */}
      <div className="ads py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols gap-10 md:grid-cols-2">
            <div>
              <Image src={ads} alt="Ads" className="w-full h-full" />
            </div>
            <div>
              <Image src={ads2} alt="Ads" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      {/* Ads End */}

      {/* Testimonials Start */}
      <div className="testimonials py-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center pb-14">
            <span className="block text-xl font-light uppercase py-2 text-gray-800">
              Our Testimonial
            </span>
            <h2 className="text-4xl font-semibold text-red-800 capitalize">
              <span className="subHeading relative">
                What our clients say
                <span className="subHeadingUnderline"></span>
              </span>
            </h2>
          </div>
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
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <div className="relative bg-yellow-500 pt-7 px-4 rounded-lg text-center pb-13">
                <p className="mb-4 text-md tracking-tight">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti corporis nobis, quo suscipit nesciunt dolorum ut
                  veritatis ullam dolores aperiam expedita quam, quae minima
                  cumque sequi vero aliquid iure vitae.
                </p>
                <h3 className="text-2xl font-semibold">Trevor Phillips</h3>
                <p className="text-red-800 font-semibold">Master Chef</p>
                <div className="clientImage">
                  <Image
                    src={client}
                    alt="client"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-yellow-500 pt-7 px-4 rounded-lg text-center pb-13">
                <p className="mb-4 text-md tracking-tight">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti corporis nobis, quo suscipit nesciunt dolorum ut
                  veritatis ullam dolores aperiam expedita quam, quae minima
                  cumque sequi vero aliquid iure vitae.
                </p>
                <h3 className="text-2xl font-semibold">Trevor Phillips</h3>
                <p className="text-red-800 font-semibold">Master Chef</p>
                <div className="clientImage">
                  <Image
                    src={client}
                    alt="client"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-yellow-500 pt-7 px-4 rounded-lg text-center pb-13">
                <p className="mb-4 text-md tracking-tight">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti corporis nobis, quo suscipit nesciunt dolorum ut
                  veritatis ullam dolores aperiam expedita quam, quae minima
                  cumque sequi vero aliquid iure vitae.
                </p>
                <h3 className="text-2xl font-semibold">Trevor Phillips</h3>
                <p className="text-red-800 font-semibold">Master Chef</p>
                <div className="clientImage">
                  <Image
                    src={client}
                    alt="client"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-yellow-500  pt-7 px-4 rounded-lg text-center pb-13">
                <p className="mb-4 text-md tracking-tight">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti corporis nobis, quo suscipit nesciunt dolorum ut
                  veritatis ullam dolores aperiam expedita quam, quae minima
                  cumque sequi vero aliquid iure vitae.
                </p>
                <h3 className="text-2xl font-semibold">Trevor Phillips</h3>
                <p className="text-red-800 font-semibold">Master Chef</p>
                <div className="clientImage">
                  <Image
                    src={client}
                    alt="client"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* Testimonials End */}

      {/* Fast Delivery Start */}
      <div className="bg-[url(../../public/image/fastDelivery.png)] bg-cover bg-no-repeat py-15 lg:py-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-start">
            <div className="text-white w-full max-w-md">
              <span className="block text-xl font-light uppercase py-3">
                Free Home Delivery 30 min
              </span>
              <h2 className="text-4xl font-semibold mb-5">
                Get Your Order 24/7 Right At Your Doorsteps
              </h2>
              <p className="text-md mb-12">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam soluta, modi nihil blanditiis maxime fugiat quibusdam
                pariatur, error fuga, facere vero ab magnam itaque officia
                voluptatum beatae? Possimus, accusamus exercitationem?
              </p>
              <div className="flex items-center justify-start mt-5">
                <button className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600">
                  Our Restaurant
                </button>
                <button className="cursor-pointer bg-yellow-600 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-red-800">
                  Order Now
                </button>
              </div>
            </div>
            <div className="w-full pt-6 flex justify-center hidden lg:block">
              <Image
                src={deliveryBoy}
                alt="Delivery Boy"
                className="w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Start */}
      <div className="blog py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center pb-14">
            <span className="block text-xl font-light uppercase py-2 text-gray-800">
              All Restaurant
            </span>
            <h2 className="text-4xl font-semibold text-red-800 capitalize">
              <span className="subHeading relative">
                New Arrival
                <span className="subHeadingUnderline"></span>
              </span>
            </h2>
          </div>
          <div className="grid grid-cols gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="blogCard bg-white rounded-lg overflow-hidden shadow-gray-300 shadow-lg">
              <div>
                <Image src={Cake} alt="Blog Image" className="w-full h-full" />
              </div>
              <div className=" p-4">
                <span className="text-red-800 uppercase font-bold mb-3 block">
                  Appetizers
                </span>
                <h4 className="text-2xl font-semibold text-gray-800 tracking-tight mb-2">
                  Amazing Decadent Pecan PIE Best Cake
                </h4>
                <p className="text-gray-500 text-sm mb-7">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  dolores aspernatur minus porro labore tempora quos minima unde
                  aperiam? Quam labore, natus porro laborum sed dicta fugit
                  doloremque cupiditate earum!
                </p>
                <div className="flex items-center justify-start">
                  <Image
                    src={client}
                    alt="Bloger Name"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div className="ml-3">
                    <h6 className="font-semibold text-xl text-gray-800">
                      Admin
                    </h6>
                    <p className="text-gray-500 text-sm">March 12, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}
    </Layout>
  );
}
