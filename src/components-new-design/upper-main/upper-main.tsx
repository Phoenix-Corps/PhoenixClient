import React from "react";
import Image from "next/image";
import PhoenixMini from "@public/home/phoenix-mini-logo.png";
import Leif from "@public/home/leif-front.png";
import PhoenixLOGO from "@public/images/phoenix-image-voucher.png";
import ButtonHome from "./reusable-components/HomeButtonYellow";
import BlueBoxMain from "./reusable-components/BlueBoxMain";
import DownArrow from "@public/home/down-arrow.png";
import BuyBox from "./reusable-components/BuyBox";
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
            <div className="flex din font-main-smaller w-fit flex-col">
              <div className="text-center">WINGS</div>
              <div>OF FINANCIAL</div>
            </div>
            <div className="pl-[22%] font-main-bigger din font-bold text-[rgba(245,248,252,1)] w-fit">
              FREEDOM
            </div>
          </div>
        </div>
        <div className="flex m-auto gap-[24px] flex-wrap">
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

        <div className="font-title-main text-center din uppercase mt-[80px] ">
          How to get started as a project
        </div>
        <div className="flex flex-wrap justify-center gap-[19px] m-auto mt-[50px]">
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
            <div className="font-title-orange din uppercase">
              Enjoy the ride
            </div>
            <div className="aeroport mt-[12px] font-description-orange ">
              Enjoy the ride and let us (Phoenix) find funds for you to manifest
              your plans in a truly organic and community driven method while
              working as hard as you can on giving us (Phoenix) as much
              promotional as possible
            </div>
          </div>
        </div>
        <div className="font-title-main text-center din uppercase mt-[80px] ">
          active & upcoming projects
        </div>
        <div className="flex flex-wrap justify-center gap-[19px] m-auto mt-[50px]">
          <BuyBox />
          <BuyBox />
          <BuyBox />
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col w-full mt-[15%] gap-[20%]">
          <div className="din font-bold text-[97px] leading-[89px] tracking-[-0.04rem] text-[rgba(245,248,252,1)] uppercase w-1/2">
            The power of true and fair community fundraising
          </div>
          <div className="aeroport font-normal text-[16px] leading-[20px] tracking-[-0.03rem] text-[rgba(216,227,244,1)] w-[40%]">
            Phoenix empowers it's army of representatives to earn money without
            investing money by promoting projects, fostering community growth
            and sharing earned commission money in a honest and proportional way
            to ensure sustainability for both Phoenix and the projects it will
            gather funds for and for the investors that will be investing in
            these private sales.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
