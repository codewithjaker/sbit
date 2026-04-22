"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface SoftwareCarouselProps {
  logos: string[];
  testimonials: {
    name: string;
    designation: string;
    review: string;
    rating: number;
    avatar?: string;
  }[];
}

export function SoftwareCarousel({
  logos,
  testimonials,
}: SoftwareCarouselProps) {
  return (
    <>
      {/* Logos Slider */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
          Trusted by Industry Leaders
        </h2>
        <div className="bg-muted/30 rounded-2xl py-8 px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 }, 
              768: { slidesPerView: 4 }, 
              1024: { slidesPerView: 10 }, 
            }}
            className="py-4"
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex justify-center items-center h-24">
                  <img
                    src={logo}
                    alt={`Client ${idx + 1}`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-2">
          <Star className="h-6 w-6 text-orange-500 fill-orange-500" />
          What Our Clients Say
          <Star className="h-6 w-6 text-orange-500 fill-orange-500" />
        </h3>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <Card className=" transition-all duration-300 h-full relative">
                <CardContent className="pt-8 pb-6">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-orange-200" />
                  <div className="flex items-center gap-4 mb-4">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-lg text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
