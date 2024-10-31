import React, { FC } from "react";
import { formatUnits } from "viem";
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
  interface Amount {
    icon: any;
    value: string;
  }

  const data: {
    project: string;
    amounts: Amount[];
    status: string;
    statusColor: string;
  }[] = [
    {
      project: "Simple Connect",
      amounts: [
        { icon: ["ETH", "USDT"], value: "0.9 ETH" },
        { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
        { icon: "BNB", value: "6,73836 BNB" },
        { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
      ],
      status: "PENDING",
      statusColor: "red"
    },
    {
      project: "Long Project Name",
      amounts: [
        { icon: ["ETH", "USDT"], value: "0.9 ETH" },
        { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
        { icon: "BNB", value: "6,73836 BNB" },
        { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
      ],
      status: "CLAIMABLE",
      statusColor: "yellow"
    },
    {
      project: "Maven Surge",
      amounts: [
        { icon: ["ETH", "USDT"], value: "0.9 ETH" },
        { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
        { icon: "BNB", value: "6,73836 BNB" },
        { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
      ],
      status: "CLAIMED",
      statusColor: "green"
    }
  ];
  const iconMap = {
    ETH: <ETH className="w-5 h-5" />,
    BNB: <BNB className="w-5 h-5" />,
    BSC: <BSC className="w-5 h-5" />,
    BTC: <BTC className="w-5 h-5" />,
    USDT: <USDT className="w-5 h-5" />
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
        {/* <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead className="text-left">
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg">Project</th>
              <th className="text-[14px] md:text-base lg:text-lg">Amount</th>
              <th className="text-[14px] md:text-base lg:text-lg">Status</th>
            </tr>
          </thead>
          <tbody className="space-x-2">
            <tr className="h-[80px]">
              <td className="pr-5 font-semibold text-[14px] md:text-base lg:text-lg">
                Simple Connect
              </td>
              <td className="flex pr-5 text-[14px] md:text-base lg:text-lg">
                
                <ETH /> 0.9 ETH <USDT />
                <ETH /> 1728 USDT ETC <BNB /> 6,73836 BNB <USDT />
                <BNB /> 1728 USDT ETC
              </td>
              <td className="text-[14px] md:text-base lg:text-lg">
                {Number(payment.claimablePayment) > 0 ? (
                  <div className={"btn-yellow-grad-container"}>
                    <button className={"btn-yellow-grad px-10"}>
                      <span className={"btn-yellow-grad-text"}>Claimable</span>
                    </button>
                  </div>
                ) : (
                  <div className={"btn-red-grad-container"}>
                    <button className={"btn-red-grad px-10"}>
                      <span className={"btn-red-grad-text"}>Pending</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            <tr className="h-[80px]">
              <td className="pr-5 font-semibold text-[14px] md:text-base lg:text-lg">
                Long Project name
              </td>
              <td className="flex pr-5 text-[14px] md:text-base lg:text-lg">
                <ETH /> 0.9 ETH <USDT />
                <ETH /> 1728 USDT ETC <BNB /> 6,73836 BNB <USDT />
                <BNB /> 1728 USDT ETC
              </td>
              <td className="text-[14px] md:text-base lg:text-lg">
                <div className={"btn-green-grad-container"}>
                  <button className={"btn-green-grad px-10"}>
                    <span className={"btn-green-grad-text"}>Claimed</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="h-[80px]">
              <td className="pr-5 font-semibold text-[14px] md:text-base lg:text-lg">
                Maven Surge
              </td>
              <td className="flex pr-5 text-[14px] md:text-base lg:text-lg">
                <ETH /> 0.9 ETH <USDT />
                <ETH /> 1728 USDT ETC <BNB /> 6,73836 BNB <USDT />
                <BNB /> 1728 USDT ETC
              </td>
              <td className="text-[14px] md:text-base lg:text-lg">
                <div className={"btn-yellow-grad-container"}>
                  <button className={"btn-yellow-grad px-10"}>
                    <span className={"btn-yellow-grad-text"}>Claimable</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default ClaimsTable;
