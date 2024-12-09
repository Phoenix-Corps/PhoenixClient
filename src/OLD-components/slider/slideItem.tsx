import React, { FC } from "react";

interface SlideItemProps {
  index: number;
  text: string;
}

const SlideItem: FC<SlideItemProps> = ({ index, text }) => {
  if (!text) {
    return null;
  }

  return (
    <>
      <div className="slide-item flex items-end px-8 py-8">
        <h3 className="slide-item_counter font-semibold">{index}.</h3>
        <p className="bottom-0 text-[22px] sans tracking-wider slide-text">
          {text}
        </p>
      </div>
    </>
  );
};

export default SlideItem;
