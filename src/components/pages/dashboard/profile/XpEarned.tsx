import React, { useCallback, useEffect, useState } from "react";
import Decimal from "decimal.js";
import { useDashboardContext } from "@/components/context/DashboardContext";
import { upgradeRank } from "@/services/walletService";
import { useEthersSigner } from "@/services/useEthersSigner";
import TransactionHandler from "@/app/buy/components/transactionHandler";

import "./XpEarned.css";

export const XpEarned: React.FC = () => {
  const { walletAddress, userInfo, resetUserInfo } = useDashboardContext();
  const signer = useEthersSigner();
  const [XPearned, setXPearned] = useState<string>("");
  const [precentXp, setPercentXp] = useState<number | null>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [txPromise, setTxPromise] = useState<any>(null);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    if (userInfo?.nextRank) {
      const percentage =
        Math.min(
          userInfo.currentXP.div(userInfo.nextRank.requiredXP!).toNumber(),
          1
        ) * 100;
      const clickable = userInfo.currentXP.gte(userInfo.nextRank.requiredXP!);
      setPercentXp(percentage);
      setIsClickable(clickable);
      setXPearned(
        `${new Decimal(
          userInfo.currentXP.toFixed(2).toString()
        )} / ${userInfo.nextRank.requiredXP?.toFixed(2).toString()}`
      );
    } else {
      setPercentXp(100);
      setIsClickable(false);
      setXPearned(`Max Rank`);
    }
  }, [userInfo?.currentXP]);

  const upgradeLevel = () => {
    if (signer) {
      setIsClickable(false);
      const promise = upgradeRank(signer);
      setTxPromise(promise);
    }
  };

  const upgradeLevelDone = useCallback((success: boolean) => {
    if (success && walletAddress) {
      resetUserInfo(walletAddress);
    } else {
      setIsClickable(true);
    }
  }, []);

  return (
    <div>
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
            <div className="w-full bg-gray-300 rounded-full overflow-hidden h-12 relative">
              <div
                className="h-full bg-green-500 text-white text-center font-bold"
                style={{ width: `${precentXp}%` }}
              ></div>
              <div className="absolute inset-0 flex justify-center items-center font-bold">
                {XPearned}
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
              ? "upgrade-button "
              : " text-gray-700 border border-gray-400 cursor-not-allowed"
          }
        `}
            >
              Upgrade
            </button>
          </div>
        )}
      </div>
      <TransactionHandler
        loadingMessage={"Upgrading rank"}
        successMessage={"Successfully upgrated rank"}
        txPromise={txPromise}
        onTxDone={upgradeLevelDone}
      />
    </div>
  );
};
