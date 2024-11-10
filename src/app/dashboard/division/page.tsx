"use client";
import React from "react";
import Image from "next/image";
import "./division.css";
import { useDashboardContext } from "@/context/DashboardContext";
import DivisionTable from "./DivisionTable";
const Division = () => {
  const { pageType } = useDashboardContext();
  return (
    <div
      className={`relative  min-h-screen p-4  bg-center bg-no-repeat  ${
        pageType === "solo" ? "solo-background" : "army-background"
      }`}
      style={{
        backgroundSize: "100% 100%"
      }}
    >
      <div className="mt-28 md:mt-20 lg:mt-36 px-4 md:px-24">
        <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
          My Division
        </h1>
        <div className="flex justify-end">
          {/* <button className="first-letter:bg-[#182C4580] recruit-button py-2 px-5 text-sm md:text-base lg:text-lg tracking-wide font-noto-serif uppercase text-white/90 flex justify-center items-center gap-x-3 transition-all rounded-3xl"> */}
          <button className="recruit-button w-48 h-11 rounded-full">
            <span className="uppercase size-4 font-bold">Recruit menu</span>
          </button>
        </div>
        <DivisionTable />
      </div>
    </div>
  );
};

export default Division;
