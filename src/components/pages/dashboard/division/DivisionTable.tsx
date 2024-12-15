import React, { useCallback, useEffect, useState } from "react";

import { useDashboardContext } from "@/components/context/DashboardContext";
import { getDivision } from "@/services/walletService";
import { useEthersProvider } from "@/services/useEthersProvider";

import { formatAddress } from "@/utils/format";

import COPY_ICON from "@/app/dashboard/public/copy-icon.svg";
import { Recruit } from "@/types/types";

export const DivisionTable = () => {
  const provider = useEthersProvider();
  const { userInfo } = useDashboardContext();
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [loadingRecruits, setLoadingRecruits] = useState<boolean>(false);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadRecruits = async () => {
      if (!userInfo || !provider) {
        return [];
      }
      setLoadingRecruits(true);
      const team = await getDivision(provider!, userInfo!.address, 0, 100);
      setRecruits(team);
      setLoadingRecruits(false);
    };

    loadRecruits();
  }, [userInfo, setLoadingRecruits, setRecruits]);

  const handleCopy = useCallback(
    (text: string, index: number) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopyIndex(index);
      });
    },
    [setCopyIndex, recruits]
  );

  return (
    <div className="table-gradient-container p-8 mt-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
      <table className="w-full table-auto border-collapse text-lg  border-spacing-y-2 whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-[14px] md:text-base lg:text-lg text-left w-3">
              #
            </th>
            <th className="text-[14px] md:text-base lg:text-lg text-left w-1/5">
              Code
            </th>
            <th className="text-[14px] md:text-base lg:text-lg text-left w-3/5">
              Address
            </th>
            <th className="text-[14px] md:text-base lg:text-lg text-left w-2/5">
              Rank
            </th>
          </tr>
        </thead>
        <tbody>
          {loadingRecruits && "LOADING..."}
          {!loadingRecruits &&
            recruits.map((recruit, index) => {
              return (
                <tr className="border-b text-lg leading-6">
                  <td className="p-5 pl-0">1</td>
                  <td>
                    <div>{recruit.code}</div>
                  </td>
                  <td>
                    <div className="flex">
                      <div>{formatAddress(recruit.address)}</div>
                      <button
                        onClick={() => handleCopy(recruit.address, index)}
                      >
                        <COPY_ICON />
                      </button>
                      {copyIndex === index && (
                        <p
                          // className="flex added-fade-out absolute right-0 top-0"
                          className="flex added-fade-out -left-3 -top-4"
                          onAnimationEnd={() => setCopyIndex(null)}
                        >
                          Copied!
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>{recruit.rankName}</div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
