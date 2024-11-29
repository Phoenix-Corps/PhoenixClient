import React from "react";
import PhoenixBlueBox from "@public/home/phoenix-logo-3.png";
import Image from "next/image";
import ButtonHome from "./HomeButtonYellow";
import { useBlockchainContext } from "@/context/BlockchainContext";
import { PoolInfo } from "@/services/walletService";
import { BigNumber } from "ethers";
import Link from "next/link";
import "./projects.css";
import USDClogo from "@public/buy/usd-coin.svg";

type Props = {};

const BuyBox = (props: Props) => {
  return (
    <div className="start-project-box w-[400px] h-[448px] rounded py-[24px] px-[24px] text-[rgba(245,248,252,1)]">
      <div className="flex justify-between">
        <div>
          <div className="din text-[36px] color-[rgba(255, 255, 255, 1);] font-bold uppercase leading-[43px]">
            phoenix beta
          </div>
          <div className="din text-[24px] color-[rgba(255, 255, 255, 1);] font-bold uppercase leading-[28px]">
            Round 4
          </div>
        </div>
        <div className="mini-blue-box w-[80px] h-[80px] rounded flex justify-center items-center">
          <Image
            src={PhoenixBlueBox.src}
            width={55}
            height={63}
            alt="phoenix-mini"
          />
        </div>
      </div>
      <div className="mini-blue-box-divider my-[24px]" />
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] color-[rgba(255, 255, 255, 1);">
          <div className=" opacity-60">Round Start:</div>
          <div className="">Nov 18 - 6:17</div>
        </div>
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] color-[rgba(255, 255, 255, 1);">
          <div className=" opacity-60">Round End:</div>
          <div className="">Nov 19 - 6:17</div>
        </div>
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] color-[rgba(255, 255, 255, 1);">
          <div className=" opacity-60">Round Price:</div>
          <div className="">0.1</div>
        </div>
      </div>
      <div className="mini-blue-box-divider my-[24px]" />
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between items-center aeroport font-normal text-[16px] leading-[20px] color-[rgba(255, 255, 255, 1);">
          <div className=" opacity-60">Round Raised:</div>
          <div className="din font-bold leading-[48px] text-[40px] tracking-[-0.02px]">
            11.02%
          </div>
        </div>

        <ButtonHome mainText="BUY NOW" link={"/buy"} miniBox={true} />
      </div>
    </div>
  );
};

export default BuyBox;
