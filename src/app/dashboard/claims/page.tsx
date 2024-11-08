"use client";

import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ClaimsTable from "./ClaimsTable";


const Claims = () => {
  const { isConnected } = useAccount();

  return (
    <div className="p-4">
      {!isConnected ? (
        <div className="text-center items-center flex flex-col justify-center">
          <p className="mb-4  text-white">Connect your wallet to continue</p>
          <div className="z-20">
            <ConnectButton />
          </div>
        </div>
      ) : (
        <div className="mt-10 lg:mt-36 px-4 md:px-20">
          <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
            My Claims
          </h1>

          <ClaimsTable />
        </div>
      )}
    </div>
  );
};

export default Claims;
