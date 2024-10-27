"use client";

import React, { useEffect, useState } from "react";
import ETH from "@/app/dashboard/public/My-claims/ETH.svg";
import BNB from "@/app/dashboard/public/My-claims/BNB.svg";
import USDT from "@/app/dashboard/public/My-claims/USDT.svg";
import BSC from "@/app/dashboard/public/My-claims/BSC.svg";
import BTC from "@/app/dashboard/public/My-claims/BTC.svg";
import NEXT_ARROW from "@/app/dashboard/public/My-claims/Next.svg";


const dateRanges: {
  value: "lastDay" | "lastWeek" | "lastMonth" | "lastYear" | "allTime";
  label: string;
}[] = [
  {
    value: "lastDay",
    label: "1D"
  },
  {
    value: "lastWeek",
    label: "7D"
  },
  {
    value: "lastMonth",
    label: "1M"
  },
  {
    value: "lastYear",
    label: "1Y"
  },
  {
    value: "allTime",
    label: "ALL"
  }
];

const OverView = () => {
  const user =null;
  const [isVisible, setVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    "lastDay" | "lastWeek" | "lastMonth" | "lastYear" | "allTime"
  >("lastDay");


  //@TODO: Fetch user earnings through Supabase, and handle filtering by date range

  const [totalSalesByDateRange, setTotalSalesByDateRange] = useState<{
    lastDay: number;
    lastWeek: number;
    lastMonth: number;
    lastYear: number;
    allTime: number;
  }>({
    lastDay: 0,
    lastWeek: 0,
    lastMonth: 0,
    lastYear: 0,
    allTime: 0
  });

  // useEffect(() => {
  //   if (!user?.transactions) return;

  //   const lastDay = user.transactions
  //     .filter(
  //       (transaction: any) =>
  //         new Date(transaction.created_at).getTime() > Date.now() - 86400000
  //     )
  //     .reduce((acc: number, curr: any) => acc + curr.paid, 0);

  //   const lastWeek = user.transactions
  //     .filter(
  //       (transaction: any) =>
  //         new Date(transaction.created_at).getTime() > Date.now() - 604800000
  //     )
  //     .reduce((acc: number, curr: any) => acc + curr.paid, 0);

  //   const lastMonth = user.transactions
  //     .filter(
  //       (transaction: any) =>
  //         new Date(transaction.created_at).getTime() > Date.now() - 2592000000
  //     )
  //     .reduce((acc: number, curr: any) => acc + curr.paid, 0);

  //   const lastYear = user.transactions
  //     .filter(
  //       (transaction: any) =>
  //         new Date(transaction.created_at).getTime() > Date.now() - 31536000000
  //     )
  //     .reduce((acc: number, curr: any) => acc + curr.paid, 0);

  //   const allTime = user.transactions.reduce(
  //     (acc: number, curr: any) => acc + curr.paid,
  //     0
  //   );

  //   setTotalSalesByDateRange({
  //     lastDay,
  //     lastWeek,
  //     lastMonth,
  //     lastYear,
  //     allTime
  //   });
  // }, [user?.transactions]);

  return (
    <div className="mt-10 md:mt-20 lg:mt-36 px-4 md:px-20">
      <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
        Quick overview
      </h1>

      <div className=" h-[45px] max-w-[1027px] mx-auto flex justify-between items-center bg-[#182C4580] rounded-[50px] font-noto-serif uppercase mt-6 md:mt-10">
        {dateRanges.map(dateRange => (
          <button
            key={dateRange.value}
            onClick={() => setSelectedDateRange(dateRange.value)}
            className={`${
              selectedDateRange === dateRange.value
                ? "yellow-button border-[4px] border-gray-500"
                : "text-white"
            } shadow-text2 rounded-full text-sm md:text-base lg:text-[18px] font-bold h-[45px] w-[189px]`}
          >
            {dateRange.label}
          </button>
        ))}
      </div>

      <div className="max-w-[609px] mx-auto mt-6 md:mt-12 lg:mt-16">
        <div className="quick-card lg:h-[206px] flex flex-col gap-0 justify-center items-center rounded-tl-[40px] lg:rounded-tl-[80px] shadow-xl py-6">
          <p className="text-[#09111B] text-base md:text-xl lg:text-[22px] text-center font-source-sans-pro">
            My Earnings
          </p>
          {!isVisible ? (
            <div
              className="cursor-pointer flex justify-center items-center gap-3"
              onClick={() => setVisible(!isVisible)}
            >
              <h1 className="shadow-text text-white text-center text-[32px] md:text-[42px] lg:text-[54px] font-bold font-noto-serif uppercase leading-[60px]">
                $0
              </h1>
              <NEXT_ARROW className="rotate-90 self-center" />
            </div>
          ) : null}
          {isVisible ? (
            <div
              className="relative cursor-pointer flex flex-col lg:flex-row gap-x-4"
              onClick={() => setVisible(!isVisible)}
            >
              <div className="flex justify-center items-center">
                <ETH className="h-[32px] w-[32px]  mr-3" />
                <span className="shadow-text text-white text-center text-[32px] md:text-[38px] lg:text-[44px] font-bold font-noto-serif uppercase leading-[60px]">
                  
                </span>
              </div>
              <div className="flex justify-center items-center">
                <USDT className="h-[32px] w-[32px]  mr-3" />
                <span className="shadow-text text-white text-center text-[32px] md:text-[38px] lg:text-[44px] font-bold font-noto-serif uppercase leading-[60px]">
                  
                </span>
              </div>
              <div className="flex justify-center items-center">
                <BTC className="h-[32px] w-[32px]  mr-3" />
                <span className="shadow-text text-white text-center text-[32px] md:text-[38px] lg:text-[44px] font-bold font-noto-serif uppercase leading-[60px]">
                  
                </span>
              </div>
              <NEXT_ARROW className="-rotate-90 absolute top-0 bottom-0 -right-[80px] m-auto lg:static lg:self-center" />
            </div>
          ) : null}
        </div>

        <div className="quick-card lg:h-[206px] flex flex-col gap-0 justify-center items-center rounded-tl-[40px] lg:rounded-tl-[80px] shadow-xl py-6 mt-6 md:mt-12 lg:mt-20">
          <p className="text-[#09111B] text-base md:text-xl lg:text-[22px] text-center font-source-sans-pro">
            Number of sales
          </p>
          <h1 className="shadow-text text-white text-center text-[32px] md:text-[42px] lg:text-[54px] font-bold font-noto-serif uppercase leading-[60px]">
            {totalSalesByDateRange[selectedDateRange]}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OverView;
