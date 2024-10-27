"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import NextArrow from "../../../public/images/Next.png";
import PrevArrow from "../../../public/images/Back.png";
import Image from "next/image";

const Slider = () => {
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
    },
    mode: "snap",
  });
  const [sliderRef, slider2] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 12, origin: "center" },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
    slides: { perView: 1 },
  });
  const handlePrev = () => {
    slider2.current?.prev();
  };

  const handleNext = () => {
    slider2.current?.next();
  };

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider pl-10 sm:pl-40">
        <div className="keen-slider__slide pb-2">
          <div className="slide-item slide-item1 mt-16">
            <h3 className="slide-item_counter font-semibold">{1}.</h3>
            <p className="bottom-0 text-[16px] font-[400] sans tracking-wider slide-text">
              Come up with a good concept, name, brand, logo etc.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide">
          <div className="slide-item slide-item2 mt-16">
            <h3 className="slide-item_counter font-semibold">{2}.</h3>
            <p className="bottom-0 text-[16px] font-[400] sans tracking-wider slide-text">
              Set realistic, fair and sustainable goals for both the project and
              it's future investors
            </p>
          </div>
        </div>
        <div className="keen-slider__slide">
          <div className="slide-item slide-item3 mt-16">
            <h3 className="slide-item_counter font-semibold">{3}.</h3>
            <p className="bottom-0 text-[16px] font-[400] sans tracking-wider slide-text">
              Contact us through the Sign up as a project or startup button on
              the bottom of the page.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide">
          <div className="slide-item  mt-16">
            <h3 className="slide-item_counter font-semibold">{4}.</h3>
            <p className="bottom-0 text-[16px] font-[400] sans tracking-wider slide-text">
              Enjoy the ride and let us (Phoenix) find funds for you to manifest
              your plans in a truly organic and community driven method while
              working as hard as you can on giving us (Phoenix) as much
              promotional and educative material about your project as possible
            </p>
          </div>
        </div>
        <div className="keen-slider__slide"></div>
      </div>
      <Image
        src={NextArrow}
        alt="next"
        onClick={handleNext}
        className="cursor absolute top-0 bottom-0 right-10 m-auto"
      />
      <Image
        src={PrevArrow}
        alt="prev"
        onClick={handlePrev}
        className="cursor absolute top-0 bottom-0 left-10 m-auto"
      />
    </div>
  );
};

export default Slider;
