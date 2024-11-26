import React from "react";

type Props = {
  number: string;
  title: string;
  description: string;
};

const BlueBoxMain: React.FC<Props> = ({ number, title, description }) => {
  return (
    <div className="start-project-box w-[296px] h-[334px] rounded py-[24px] px-[24px] pt-[50px] text-[rgba(245,248,252,1)]">
      <div className="din text-[130px] box-letter w-fit">{number}</div>
      <div className="text-[18px] leading-7 mt-[39px] uppercase font-bold">
        {title}
      </div>
      <div className="text-[12px] mt-[12px] font-normal leading-5 text-[rgba(216, 227, 244, 1);]">
        {description}
      </div>
    </div>
  );
};

export default BlueBoxMain;
