import React from "react";

type Props = {
  number: string;
  title: string;
  description: string;
};

const BlueBoxMain: React.FC<Props> = ({ number, title, description }) => {
  return (
    <div className="flex start-project-box nm:w-[296px] w-full max-w-[296px] h-[334px] rounded py-[24px] px-[24px] pt-[50px] text-[rgba(245,248,252,1)] nm:flex-col flex-row">
      <div className="din text-[130px] box-letter w-fit flex nm:items-start items-center">{number}</div>
      <div className="nm:ml-0 ml-3">
        <div className="font-title-blue mt-[39px] din uppercase">{title}</div>
        <div className="font-description-blue aeroport mt-[12px]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default BlueBoxMain;
