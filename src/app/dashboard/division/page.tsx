"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { RecruitmentMenu } from "@/components/pages/dashboard/RecruitMenu";
import { LoadingOverlay } from "@/components/Page/LoadingOverlay";

import { useDashboardContext } from "@/components/context/DashboardContext";

import { useEthersProvider } from "@/services/useEthersProvider";
import { getDivision } from "@/services/walletService";
import { formatAddress } from "@/utils/format";

import { mock_division_recruits } from "@/mock/mockUtils";

import { Recruit } from "@/types/types";

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
            src={`/images/ranks/team/Lvl-${(
              props.recruit.rankId + 1
            ).toString()}.png`}
            alt="Rank"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="column_address flex justify-between items-center">
        <div className="smallVisible">Address</div>
        {formatAddress(props.recruit.address)}
      </div>
      <div className="column_rank flex justify-between items-center">
        <div className="smallVisible">Rank</div>
        <div className="flex items-center justify-end gap-2">
          {props.recruit.rankName}
          <div className="smallHidden">
            <Image
              src={`/images/ranks/team/Lvl-${(
                props.recruit.rankId + 1
              ).toString()}.png`}
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

const useData = (useMockData: boolean) => {
  const provider = useEthersProvider();
  const { userInfo } = useDashboardContext();

  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [loadingRecruits, setLoadingRecruits] = useState<boolean>(false);

  const mockRecruits = useMemo(() => mock_division_recruits(), []);

  useEffect(() => {
    const loadRecruits = async () => {
      if (!userInfo || !provider) return [];
      setLoadingRecruits(true);
      const team = await getDivision(provider!, userInfo!.address, 0, 100);
      setRecruits(team);
      setLoadingRecruits(false);
    };

    loadRecruits();
  }, [userInfo]);

  return {
    loadingRecruits,
    recruits: useMockData ? mockRecruits : recruits
  };
};

export default function Page() {
  const { recruits, loadingRecruits } = useData(false);

  return (
    <div className="din color_textAccent page-container flex flex-col items-center">
      <div className="text-5xl mb-5">MY CLAIMS</div>

      <div className="gridItem-container card-box rounded p-5 mb-5">
        <RecruitmentMenu />
      </div>

      <div className="gridItem-container card-box rounded px-5">
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
