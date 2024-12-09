import React from "react";
import Image from "next/image";
import Link from "next/link";

import Vector from "@public/pages/home/Vector_right.png";

type Props = {
  mainText: string;
  rightText?: string;
  link?: string;
  onClick?: () => void;
  miniBox?: boolean;
  width?: number;
  target?: string;
};

export const ButtonYellow: React.FC<Props> = ({
  mainText,
  rightText,
  link,
  onClick,
  miniBox,
  width,
  target
}) => {
  const widthClass = `w-[${width ?? 300}px]`;
  return (
    <div>
      <Link href={link ?? ""} target={target}>
        <button
          className={`
            flex din button-front-yellow justify-center items-center text-[28px] p-4 rounded w-[300px]
            ${widthClass}
            ${miniBox && "flex justify-between w-full"}
          `}
          onClick={onClick}
        >
          <div className="main-text-button-front h-[34px]">{mainText}</div>
          {rightText && (
            <div className="right-text-button-front h-[34px] ml-[24px]">
              {rightText}
            </div>
          )}
          <Image
            className="ml-[12px]"
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
