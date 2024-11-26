import React from "react";
import Image from "next/image";
import PhoenixMini from "@public/home/phoenix-mini-logo.png";
import Leif from "@public/home/leif-front.png";
import PhoenixLOGO from "@public/images/phoenix-image-voucher.png";
import ButtonHome from "./reusable-components/HomeButtonYellow";
import BlueBoxMain from "./reusable-components/BlueBoxMain";
import DownArrow from "@public/home/down-arrow.png";
const Main = () => {
  return (
    <div className="main-air-wrapper">
      <div className="w-40 relative">
        <Image
          src={PhoenixMini.src}
          width={122}
          height={28}
          alt="phoenix-mini"
        />
        <Image
          src={Leif.src}
          width={37}
          height={21}
          alt="leif"
          className="absolute right-0 top-[-12px]"
        />
      </div>
      <div className="flex justify-center flex-col ">
        <div className="w-fit relative m-auto">
          <Image
            src={PhoenixLOGO.src}
            width={1200}
            height={700}
            alt="phoenix-logo"
          />
          <div className="w-fit absolute left-[5%] top-[30%]">
            <div className="flex font-bold text-[56px] leading-[50px] text-[rgba(245,248,252,1)] w-fit flex-col">
              <div className="text-center">WINGS</div>
              <div>OF FINANCIAL</div>
            </div>
            <div className="pl-[25%] din font-bold text-[140px] text-[rgba(245,248,252,1)] w-fit">
              FREEDOM
            </div>
          </div>
        </div>
        <div className="flex m-auto gap-[24px]">
          <ButtonHome
            mainText="SHINOBI ALLIANCE"
            rightText="SIGN UP"
            link={"/dashboard"}
          />
          <ButtonHome
            mainText="PROJECT / START UP"
            rightText="SIGN UP"
            link={"/dashboard"}
          />
        </div>
        <div className=" mt-4 flex justify-center pr-[13px]">
          <Image src={DownArrow.src} width={23} height={26} alt="down-arrow" />
        </div>

        <div className="din font-bold text-center text-[40px] uppercase mt-[80px] text-[rgba(245,248,252,1)]">
          How to get started as a project
        </div>
        <div className="flex flex-wrap justify-center gap-[19px] m-auto">
          <BlueBoxMain
            number={"1"}
            title={"come up with a concept"}
            description={"Come up with a good concept, name, brand, logo etc."}
          />
          <BlueBoxMain
            number={"2"}
            title={"Set project goals"}
            description={
              "Set realistic, fair and sustainable goals for both the project and it's future investors"
            }
          />
          <BlueBoxMain
            number={"3"}
            title={"Sign up"}
            description={
              'Contact us through the "Sign up as a project form" (that text should be a link that links to the form for signing up as a project'
            }
          />
          <div className="orange-project-box w-[296px] h-[334px] rounded py-[24px] px-[24px]  text-[rgba(245,248,252,1)]">
            <div className="text-[45px] leading-[55px]  uppercase font-bold">
              Enjoy the ride
            </div>
            <div className="text-[16px] mt-[12px] font-normal leading-5 text-[rgba(216, 227, 244, 1);]">
              Enjoy the ride and let us (Phoenix) find funds for you to manifest
              your plans in a truly organic and community driven method while
              working as hard as you can on giving us (Phoenix) as much
              promotional as possible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
