import React, { useEffect, useState } from "react";
import VECTOR_1 from "@/app/dashboard/public/my-profile/Vector 1.svg";

import { useDashboardContext } from "@/context/DashboardContext";

const XPearned: React.FC = () => {
  const { userInfo, fetchUserInfo, walletAddress } = useDashboardContext();

  const [XPearned, setXPearned] = useState<string>("");
  const [precentXp, setPercentXp] = useState<number | null>(null);
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetchUserInfo(walletAddress);
    }
    if (userInfo?.currentRank?.requiredXP && userInfo?.nextRank?.requiredXP) {
      setPercentXp(
        ((userInfo.currentXP - userInfo.currentRank.requiredXP) /
          (userInfo.nextRank.requiredXP - userInfo.currentRank.requiredXP)) *
          100
      );

      setXPearned(`${userInfo.currentXP} / ${userInfo.nextRank.requiredXP}`);
      if (
        userInfo.currentXP &&
        userInfo.nextRank.requiredXP &&
        userInfo.currentXP > userInfo.nextRank.requiredXP
      ) {
        setIsClickable(true);
      }
    }
  }, [userInfo]);

  const upgradeLevel = () => {
    if (
      userInfo?.currentXP &&
      userInfo?.nextRank?.requiredXP &&
      userInfo.currentXP > userInfo.nextRank.requiredXP
    ) {
      console.log("rank upgraded");
    }
  };

  return (
    <div className="profile-card-black bg-dark-card-grad pb-5 rounded-b-[40px] md:rounded-b-[60px] h-fit lg:rounded-b-[80px] shadow-xl px-[56px] font-noto-serif relative">
      <div className="flex flex-col gap-5 justify-center items-center pt-4">
        <span className="yellow-button flex items-center gap-1 justify-center text-[#182C45] rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px] border-[4px] border-[#F2E63D] uppercase font-bold">
          xp earned <VECTOR_1 alt="Vector Icon" />
        </span>
      </div>

      {!XPearned ? (
        <div className="flex justify-center text-white">Loading...</div>
      ) : (
        <div className="p-6">
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-green-500 text-white text-center font-bold"
              style={{ width: `${precentXp}%` }}
            >
              <div>{XPearned}</div>
            </div>
          </div>
          <button
            onClick={isClickable ? upgradeLevel : undefined}
            className={`
        flex items-center justify-center m-auto mt-4
        rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px]
        uppercase font-bold
        transition-colors duration-500 ease-in-out
        ${
          isClickable
            ? "bg-gray-400 text-white border border-white"
            : " text-gray-700 border border-gray-400 cursor-not-allowed"
        }
      `}
          >
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
};

export default XPearned;
