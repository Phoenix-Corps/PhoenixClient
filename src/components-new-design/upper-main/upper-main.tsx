import React from "react";
import Image from "next/image";
import PhoenixMini from "@public/home/phoenix-mini-logo.png";
import Leif from "@public/home/leif-front.png";
import PhoenixLOGO from "@public/images/phoenix-image-voucher.png";
import ButtonHome from "./reusable-components/HomebuttonYellow";
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
          <ButtonHome mainText="SHINOBI ALLIANCE" rightText="SIGN UP" link={"/dashboard"}/>
          <ButtonHome mainText="PROJECT / START UP" rightText="SIGN UP" link={"/dashboard"}/>
        </div>
        <div className=" mt-4 flex justify-center pr-[13px]">
          <Image src={DownArrow.src} width={23} height={26} alt="down-arrow" />
        </div>

        <div className="din font-bold text-center text-[40px] uppercase mt-[80px] text-[rgba(245,248,252,1)]">
          How to get started as a project
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Main;
