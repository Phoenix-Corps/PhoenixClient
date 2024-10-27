import { FC } from "react";
import { formatUnits } from "viem";

interface PaymentData {
  poolId: number;
  claimablePayment: bigint;
  totalPayment: bigint;
  claimedPayment: bigint;
}

interface ClaimsTableProps {
  payment: PaymentData;
}

const ClaimsTable: FC<ClaimsTableProps> = ({ payment }) => {
  const { poolId, claimablePayment, totalPayment, claimedPayment } = payment;

  const formatAmount = (amount: bigint) => {
    
    //@ts-ignore
    return Number(formatUnits(amount.result, 9));
  };

  return (
    <>
      <div className="table-gradient-container p-8 mt-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Sale {poolId}</h2>
        <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead className="text-left">
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg">Type</th>
              <th className="text-[14px] md:text-base lg:text-lg">Amount</th>
              <th className="text-[14px] md:text-base lg:text-lg">Status</th>
            </tr>
          </thead>
          <tbody className="space-x-2">
            <tr className="h-[80px]">
              <td className="pr-5 font-semibold text-[14px] md:text-base lg:text-lg">
                Claimable Payment
              </td>
              <td className="pr-5 text-[14px] md:text-base lg:text-lg">
                {formatAmount(payment?.claimablePayment)}
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

            {/* <tr className="h-[80px]">
              <td className="pr-5 font-semibold text-[14px] md:text-base lg:text-lg">
                Claimed Payment
              </td>
              <td className="pr-5 text-[14px] md:text-base lg:text-lg">
                {formatAmount(payment?.claimedPayment)}
              </td>
              <td className="text-[14px] md:text-base lg:text-lg">
                <div className={"btn-green-grad-container"}>
                  <button className={"btn-green-grad px-10"}>
                    <span className={"btn-green-grad-text"}>Claimed</span>
                  </button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClaimsTable;
