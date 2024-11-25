import React from "react";
import Image from "next/image";
import Vector from "@public/home/Vector_right.png";
import Link from "next/link";

type Props = {
  mainText: string;
  rightText?: string;
  link: string;
};

const ButtonHome: React.FC<Props> = ({ mainText, rightText, link }) => {
  return (
    <div>
      <Link href={link}>
        <button className="flex din button-front-yellow justify-center items-center text-[28px] p-4 rounded">
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

export default ButtonHome;
