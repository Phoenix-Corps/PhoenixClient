import Image from "next/image";

import { ButtonYellow } from "@/components/Buttons/ButtonYellow";

import DownArrow from "@public/pages/home/down-arrow.png";

export const LandingSection = () => {
  return (
    <div className="h-screen">
      <div className="w-[100%] h-[70%] md:h-[80%] md:w-[90%] relative m-auto pointer-events-none">
        <div className="main-background-image absolute h-[100%] w-[100%] left-0 right-0 m-auto z-[1]" />
      </div>
      <div className="w-[80%] flex m-auto gap-[24px] md:mt-0 mt-4 flex-wrap justify-center">
        <ButtonYellow
          mainText="SHINOBI&nbsp;&nbsp;&nbsp;ALLIANCE"
          rightText="SIGN UP"
          link={"/dashboard"}
        />
        <ButtonYellow
          mainText="PROJECT / START UP"
          rightText="SIGN UP"
          link={"https://forms.gle/SMdyUtL5EmpYqhUs9"}
          target="_blank"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Image src={DownArrow.src} width={23} height={26} alt="down-arrow" />
      </div>
    </div>
  );
};
