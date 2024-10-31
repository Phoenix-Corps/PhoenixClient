import React, { FC, useState } from "react";
import { formatUnits } from "viem";
import { data } from "@/app/dashboard/claims/mockData";
import ETH from "@/app/dashboard/public/My-claims/ETH.svg";
import BNB from "@/app/dashboard/public/My-claims/BNB.svg";
import BSC from "@/app/dashboard/public/My-claims/BSC.svg";
import BTC from "@/app/dashboard/public/My-claims/BTC.svg";
import USDT from "@/app/dashboard/public/My-claims/USDT.svg";

const ClaimsTable: React.FC = () => {
  // const { poolId, claimablePayment, totalPayment, claimedPayment } = payment;

  const formatAmount = (amount: bigint) => {
    //@ts-ignore
    return Number(formatUnits(amount.result, 9));
  };

  const iconMap = {
    ETH: <ETH />,
    BNB: <BNB />,
    BSC: <BSC />,
    USDT: <USDT />
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

  return (
    <>
      <div className="table-gradient-container p-8 mt-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
        <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead>
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg">Project</th>
              <th className="text-[14px] md:text-base lg:text-lg">Amount</th>
              <th className="text-[14px] md:text-base lg:text-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 b-">{row.project}</td>
                <td className="p-4 flex flex-wrap gap-4">
                  {row.amounts.map((amount, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {Array.isArray(amount.icon) ? (
                        amount.icon.map((icon, i) => (
                          <span key={i}>
                            {iconMap[icon as keyof typeof iconMap]}
                          </span>
                        ))
                      ) : (
                        <span>
                          {iconMap[amount.icon as keyof typeof iconMap]}
                        </span>
                      )}
                      <span>{amount.value}</span>
                    </div>
                  ))}
                </td>
                <td className="p-4">
                  <div className={`btn-${row.statusColor}-grad-container`}>
                    <button className={`btn-${row.statusColor}-grad px-10`}>
                      <span className={`btn-${row.statusColor}-grad-text`}>
                        {row.status}
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
