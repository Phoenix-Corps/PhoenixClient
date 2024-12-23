"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Select } from "@/components/Inputs/Select";
import { TextInput } from "@/components/Inputs/TextInput";
import { ButtonState } from "@/components/Buttons/ButtonState";

import { useDashboardContext } from "@/components/context/DashboardContext";
import { LoadingOverlay } from "@/components/Page/LoadingOverlay";

import { useEthersProvider } from "@/services/useEthersProvider";
import { useEthersSigner } from "@/services/useEthersSigner";
import { getDivision, getHireRankInfo } from "@/services/walletService";

import { HireRank, Recruit } from "@/types/types";

import { mock_division_recruits } from "@/mock/mockUtils";

import "./page.css";

const Item = (props: { index: number; recruit: Recruit }) => {
  return (
    <div
      className={`gridItem flex items-center ${
        props.index === 0 ? "first" : ""
      }`}
    >
      <div className="text-xl column_code flex">
        {props.recruit.code}
        <div className="smallVisible">
          <Image
            src={`/images/ranks/team/Lvl-${props.recruit.rankId}.png`}
            alt="Rank"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="column_address flex justify-between items-center">
        <div className="smallVisible">Address</div>
        {props.recruit.address}
      </div>
      <div className="column_rank flex justify-between items-center">
        <div className="smallVisible">Rank</div>
        <div className="flex items-center justify-end gap-2">
          {props.recruit.rankName}
          <div className="smallHidden">
            <Image
              src={`/images/ranks/team/Lvl-${props.recruit.rankId}.png`}
              alt="Rank"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruitmentMenu = () => {
  const provider = useEthersProvider();
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
    <div className="gridItem-container rounded p-5 mb-5 flex justify-between gap-2">
      <div>
        <div className="text-2xl">RECRUITMENT</div>
        <div className="flex text-s">
          <div>{userInfo?.currentXP.toFixed(0)}</div>
          <div className="pl-2 opacity-60">SPENDABLE XP</div>
        </div>
      </div>

      <Select placeholder="DESIRED RANK" options={ranks.map(r => r.name)} />
      <TextInput
        placeholder="NEW RECRUIT'S WALLET ADDRESS"
        className="w-[300px]"
      />

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
  //const recruits = useMemo(() => mock_division_recruits(), []);

  const provider = useEthersProvider();
  const { userInfo } = useDashboardContext();

  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [loadingRecruits, setLoadingRecruits] = useState<boolean>(false);

  useEffect(() => {
    const loadRecruits = async () => {
      if (!userInfo || !provider) return [];
      setLoadingRecruits(true);
      const team = await getDivision(provider!, userInfo!.address, 0, 100);
      setRecruits(team);
      setLoadingRecruits(false);
    };

    loadRecruits();
  }, [userInfo, setLoadingRecruits, setRecruits]);

  return (
    <div className="din color_text page-container flex flex-col items-center">
      <div className="text-5xl mb-5">MY CLAIMS</div>
      <RecruitmentMenu />
      <div className="gridItem-container rounded px-5">
        <div className="smallHidden">
          <div className="flex h-[50px] items-center py-3 text-base opacity-60">
            <div className="column_code">Code</div>
            <div className="column_address">Address</div>
            <div className="column_rank text-right">Rank</div>
          </div>
        </div>

        {recruits.map((r, idx) => (
          <Item key={idx} index={idx} recruit={r} />
        ))}
      </div>
      <LoadingOverlay isLoading={loadingRecruits} />
    </div>
  );
}
