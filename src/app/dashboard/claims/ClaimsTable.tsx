import React, { FC, useEffect, useState } from "react";
import { formatUnits } from "viem";
import { data } from "@/app/dashboard/claims/mockData";
import Image from "next/image";

import ETH from "@/app/dashboard/public/My-claims/ETH.svg";
import BNB from "@/app/dashboard/public/My-claims/BNB.svg";
import BSC from "@/app/dashboard/public/My-claims/BSC.svg";
import BTC from "@/app/dashboard/public/My-claims/BTC.svg";
import USDT from "@/app/dashboard/public/My-claims/USDT.svg";
import { claim } from "@/services/walletService";
import { PoolInfo } from "@/services/walletService";
import { getUserClaimInfo } from "@/services/walletService";
import { text } from "stream/consumers";
import { useBlockchainContext } from "@/context/BlockchainContext";
import { useEthersProvider } from "@/services/useEthersProvider";

const ClaimsTable: React.FC = () => {
  // const { poolId, claimablePayment, totalPayment, claimedPayment } = payment;
  const { fetchAllPoolInfo } = useBlockchainContext();
  const provider = useEthersProvider();
  const [projects, setProjects] = useState<PoolInfo[]>([]);
  const [claimTable, setClaimTable] = useState<any[]>([]);

  useEffect(() => {
    getUserClaimInfo(provider, "0x0")
      .then(claims => {
        setClaimTable(claims);
      })
      .catch(err => {
        console.log(err);
      });

    fetchAllPoolInfo()
      .then(poolData => {
        setProjects(poolData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const formatAmount = (amount: bigint) => {
    //@ts-ignore
    return Number(formatUnits(amount.result, 9));
  };

  const totalPages = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getClaimInfo = (projClaim: any) => {
    if (projClaim.claimable > 0) {
      const amount = projClaim.claimable;
      return { color: "yellow", text: "CLAIMABLE", amount };
    } else if (
      projClaim.claimble == 0 &&
      projClaim.totalPayment > projClaim.claimedPayment
    ) {
      const amount = projClaim.totalPayment - projClaim.claimedPayment;
      return { color: "red", text: "PEDNING", amount };
    } else {
      const amount = projClaim.totalPayment;
      return { color: "green", text: "CLAIMED", amount };
    }
  };

  return (
    <>
      <div className="table-gradient-container p-8 mt-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
        <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead>
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-2/5">
                Project
              </th>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-2/5">
                Amount
              </th>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-1/5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              projects.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 pl-0">{row.projectInfo.name}</td>
                  <td className="p-4 pl-0 flex flex-wrap gap-4">
                    <div key={row.id} className="flex items-center gap-2">
                      <span>
                        <Image
                          src={row.token.logo}
                          alt={row.token.symbol}
                          width={40}
                          height={40}
                          className="project-logo"
                        />
                      </span>
                      <span>{getClaimInfo(claimTable[index]).amount}</span>
                    </div>
                  </td>
                  <td key={index}>
                    <div
                      className={`btn-${
                        getClaimInfo(claimTable[index]).color
                      }-grad-container`}
                    >
                      <button
                        className={`btn-${
                          getClaimInfo(claimTable[index]).color
                        }-grad px-10`}
                      >
                        <span
                          className={`btn-${
                            getClaimInfo(claimTable[index]).color
                          }-grad-text`}
                        >
                          {getClaimInfo(claimTable[index]).text}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <div className="inline-flex items-center bg-gray-100 rounded-full p-2 shadow-md m-3">
          <button
            className="text-gray-500 hover:bg-gray-300 p-2 rounded-full disabled:text-gray-300"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &#x276E;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`w-10 h-10 mx-1 flex items-center justify-center rounded-full transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-transparent text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="text-gray-500 hover:bg-gray-300 p-2 rounded-full disabled:text-gray-300"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            &#x276F;
          </button>
        </div>
      </div>
    </>
  );
};

export default ClaimsTable;
