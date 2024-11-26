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
      <div className="font-title mt-[39px]">
        {title}
      </div>
      <div className="font-description mt-[12px]">
        {description}
      </div>
    </div>
  );
};

export default BlueBoxMain;
