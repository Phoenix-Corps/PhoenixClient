import React, { useEffect, useState } from "react";
import VECTOR_1 from "@/app/dashboard/public/my-profile/Vector 1.svg";

import { useDashboardContext } from "@/context/DashboardContext";
import { upgradeRank } from "@/services/walletService";
import { useEthersSigner } from "@/services/useEthersSigner";
const XPearned: React.FC = () => {
  const { userInfo } = useDashboardContext();
  const signer = useEthersSigner();
  const [XPearned, setXPearned] = useState<string>("");
  const [precentXp, setPercentXp] = useState<number | null>(null);
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    if (userInfo?.nextRank) {
      const percentage = Math.min(userInfo.currentXP / userInfo.nextRank.requiredXP!, 1) * 100;
      const clickable = userInfo.currentXP >= userInfo.nextRank.requiredXP!;
      setPercentXp(percentage);
      setIsClickable(clickable);
      setXPearned(`${userInfo.currentXP} / ${userInfo.nextRank.requiredXP}`);
    } else {
      setPercentXp(100);
      setIsClickable(false);
      setXPearned(`Max Rank`);
    }
  }, [userInfo?.currentXP]);

  const upgradeLevel = () => {
    if (
      userInfo?.currentXP &&
      userInfo?.nextRank?.requiredXP &&
      userInfo.currentXP >= userInfo.nextRank.requiredXP &&
      signer
    ) {
      upgradeRank(signer);
    }
  };

  return (
    <div className="profile-card-black bg-dark-card-grad pb-5 rounded-b-[40px] md:rounded-b-[60px] h-fit lg:rounded-b-[80px] shadow-xl px-[56px] font-noto-serif relative">
      <div className="flex flex-col gap-5 justify-center items-center pt-4">
        <span className="yellow-button flex items-center gap-1 justify-center text-[#182C45] text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px] border-[#F2E63D] uppercase font-bold border-0 rounded-sm">
          xp earned 
        </span>
      </div>

      {!XPearned ? (
        <div className="flex justify-center text-white">Loading...</div>
      ) : (
        <div className="p-6">
          <div className="w-full bg-gray-300 rounded-full overflow-hidden h-12">
            <div
              className="h-full bg-green-500 text-white text-center font-bold"
              style={{ width: `${precentXp}%` }}
            >
                <div className="pl-6 w-[120px] min-w-[40px] h-12 flex justify-center items-center">
                {XPearned}
              </div>
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
