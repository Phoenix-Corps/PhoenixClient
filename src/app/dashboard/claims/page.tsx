"use client";

import React, { useEffect } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ClaimsTable from "./ClaimsTable";

import { useDashboardContext } from "@/context/DashboardContext";
const Claims = () => {
  const { isConnected } = useAccount();
  const { pageType, userInfo, walletAddress, fetchUserInfo } =
    useDashboardContext();
  useEffect(() => {
    if (walletAddress) {
      fetchUserInfo(walletAddress);
    }
  }, [userInfo]);
  return (
    <div className="mt-28 md:mt-20 lg:mt-36 px-4 md:px-24">
      <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
        My Claims
      </h1>
      {userInfo ? <ClaimsTable /> : null}
    </div>
  );
};

export default Claims;
