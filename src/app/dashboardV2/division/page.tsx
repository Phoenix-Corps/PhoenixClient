"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { ButtonYellow } from "@/components/Buttons/ButtonYellow";
import { Select } from "@/components/Inputs/Select";

import { useDashboardContext } from "@/components/context/DashboardContext";

import { useEthersProvider } from "@/services/useEthersProvider";
import { useEthersSigner } from "@/services/useEthersSigner";
import { getHireRankInfo } from "@/services/walletService";

import { HireRank, Recruit } from "@/types/types";

import { mock_division_recruits } from "@/mock/mockUtils";

import "./page.css";
import { TextInput } from "@/components/Inputs/TextInput";
import { ButtonHollow } from "@/components/Buttons/ButtonHollow";
import { ButtonState } from "@/components/Buttons/ButtonState";

const Item = (props: Recruit) => {
  return (
    <div className="gridItem flex h-[50px] items-center py-10 text-xl">
      <div className="text-xl column_code">{props.code}</div>
      <div className="column_address">{props.address}</div>
      <div className="column_rank text-right">{props.rankName}</div>
    </div>
  );
};

const RecruitmentMenu = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const { userInfo, walletAddress, fetchUserInfo } = useDashboardContext();

  const [ranks, setRanks] = useState<HireRank[]>([]);

  const getHireInfo = useCallback(async () => {
    if (userInfo && provider) {
      const loadedRanks = await getHireRankInfo(
        provider,
        userInfo.address,
        [0, 4, 9]
      );
      setRanks(loadedRanks);
    }
  }, [userInfo, setRanks]);

  useEffect(() => {
    if (walletAddress) {
      getHireInfo();
      fetchUserInfo(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="gridItem-container rounded p-5 mb-5 flex">
      <div>
        <div className="text-2xl">RECRUITMENT</div>
        <div className="flex text-s">
          <div>{userInfo?.currentXP.toFixed(0)}</div>
          <div className="pl-2 opacity-60">SPENDABLE XP</div>
        </div>
      </div>

      <Select placeholder="DESIRED RANK" options={ranks.map(r => r.name)} />
      <TextInput placeholder="NEW RECRUIT'S WALLET ADDRESS" />

      <div className="w-[200px] flex flex-col items-center justify-center">
        <div className="text-2xl">??? XP</div>
        <div className="flex text-s">
          <div>???</div>
          <div className="pl-2 opacity-60">VOUCHERS</div>
        </div>
      </div>

      <ButtonState
        enabled={true}
        mainText="RECRUIT"
        width={150}
        className="!p-2"
      />
    </div>
  );
};

export default function Page() {
  const recruits = useMemo(() => mock_division_recruits(), []);

  return (
    <div className="din color_text m-auto w-[1200px]">
      <div className="text-5xl mb-5">MY DIVISION</div>
      <RecruitmentMenu />
      <div className="gridItem-container rounded px-5">
        <div className="flex h-[50px] items-center py-3 text-base opacity-60">
          <div className="column_code">Code</div>
          <div className="column_address">Address</div>
          <div className="column_rank text-right">Rank</div>
        </div>

        {recruits.map(r => (
          <Item {...r} />
        ))}
      </div>
    </div>
  );
}
