import React from "react";
import Link from "next/link";

import Icon_Right from "@public/icons/right.svg";

export type ButtonProps = {
  mainText: string;
  rightText?: string;
  link?: string;
  onClick?: () => void;
  miniBox?: boolean;
  width?: number;
  target?: string;
  className?: string;
  classNameOuter?: string;
};

export const ButtonBase: React.FC<ButtonProps> = ({
  mainText,
  rightText,
  link,
  onClick,
  miniBox,
  width,
  target,
  className,
  classNameOuter
}) => {
  const widthClass = `w-[${width ?? 300}px]`;
  return (
    <div className={classNameOuter}>
      <Link href={link ?? ""} target={target}>
        <button
          className={`flex din justify-center items-center text-[28px] p-4 rounded ${widthClass} ${
            miniBox ? "flex justify-between w-full" : ""
          } ${className ?? ""}`}
          onClick={onClick}
        >
          <div className="main-text-button-front h-[34px]">{mainText}</div>
          {rightText && (
            <div className="right-text-button-front h-[34px] ml-[24px]">
              {rightText}
            </div>
          )}
          <Icon_Right
            className="ml-[12px]"
            width={16}
            height={12}
            alt="right"
          />
        </button>
      </Link>
    </div>
  );
};
