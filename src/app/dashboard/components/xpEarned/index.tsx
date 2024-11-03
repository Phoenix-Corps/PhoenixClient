import React, { useEffect, useState } from "react";
import VECTOR_1 from "@/app/dashboard/public/my-profile/Vector 1.svg";
import { useEthersProvider } from "@/services/useEthersProvider";
import { getUserInfo, upgradeRank } from "@/services/walletService";

const XPearned = () => {
  const provider = useEthersProvider();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [XPearned, setXPearned] = useState<any>("");
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setXPearned(
        ((userInfo.currentXP - userInfo.currentRank.requiredXP) /
          (userInfo.nextRank.requiredXP - userInfo.currentRank.requiredXP)) *
          100
      );
      if (userInfo.currentXP &&
        userInfo.nextRank.requiredXP &&
        userInfo.currentXP > userInfo.nextRank.requiredXP) {
        setIsClickable(true);
      }
    }
  }, [userInfo]);
  useEffect(() => {
    const fetchPresales = async () => {
      if (provider) {
        setUserInfo(
          await getUserInfo(
            provider,
            "0x25F1bf92e5fCA378DcB2FCA6A53e099A6cC0D300"
          )
        );
      }
    };

    fetchPresales();
  }, []);
  const upgradeLevel = () => {
    if (
      userInfo.currentXP &&
      userInfo.nextRank.requiredXP &&
      userInfo.currentXP > userInfo.nextRank.requiredXP
    ) {
      console.log("rank upgraded");
    }
  };

  return (
    <div className="profile-card-black bg-dark-card-grad pb-5 rounded-b-[40px] md:rounded-b-[60px] h-fit lg:rounded-b-[80px] shadow-xl px-[56px] font-noto-serif relative">
      <div className="flex flex-col gap-5 justify-center items-center pt-4">
        <button className="yellow-button flex items-center gap-1 justify-center text-[#182C45] rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px] border-[4px] border-[#F2E63D] uppercase font-bold">
          xp earned <VECTOR_1 alt="Vector Icon" />
        </button>
      </div>

      {!XPearned ? (
        <div className="flex justify-center text-white">Loading...</div>
      ) : (
        <div className="p-6">
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-green-500 text-white text-center font-bold"
              style={{ width: `${XPearned}%` }}
            >
              {`${Math.round(XPearned)}%`}
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
