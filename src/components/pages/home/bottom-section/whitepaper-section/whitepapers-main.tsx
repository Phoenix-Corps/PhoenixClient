import React from "react";
import { Whitepaper } from "./whitepaper";

const WhitepapersSection: React.FC = () => {
  return (
    <div className="md:w-[80%] w-[95%]">
      <div className="pt-10 pb-10 w-full flex flex-column justify-center">
        <h4 className="whitepaper-font-title">WHITEPAPER</h4>
      </div>
      <div className="pb-3 flex gap-2 flex-col justify-center items-center">
        <Whitepaper
          text="FOR REPRESENTATIVES"
          link="/documents/phoenix_whitepaper.pdf"
        />
        <Whitepaper text="FOR PROJECTS AND STARTUPS" />
        <Whitepaper text="FOR INVESTORS" />
      </div>
    </div>
  );
};

export default WhitepapersSection;
