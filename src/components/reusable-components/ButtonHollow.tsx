import React from "react";
import Image from "next/image";
import Link from "next/link";

import Vector from "@public/pages/home/Vector_right.png";

type Props = {
  mainText: string;
  rightText?: string;
  link: string;
  miniBox?: boolean;
};

export const ButtonHollow: React.FC<Props> = ({
  mainText,
  rightText,
  link,
  miniBox
}) => {
  return (
    <div>
      <Link href={link}>
        <button
          className={`flex din button-front-hollow justify-center items-center text-[28px] p-4 rounded ${
            miniBox && "flex justify-between w-full"
          } `}
        >
          <div className="main-text-button-front text-[#ffffff] h-[34px]">
            {mainText}
          </div>
          {rightText && (
            <div className="right-text-button-front h-[34px] ml-[24px]">
              {rightText}
            </div>
          )}
          <Image
            className="ml-[12px] "
            src={Vector.src}
            width={7}
            height={16}
            alt="right"
          />
        </button>
      </Link>
    </div>
  );
};
