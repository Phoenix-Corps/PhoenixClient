// TransactionTable.tsx

import Image from "next/image";
import ARROW from "@/app/dashboard/public/Transactions/Next.svg";
import COPY from "@/app/dashboard/public/my-profile/copy icon.svg";
import NEXT from "@/app/dashboard/public/My-Division/Next.svg";
import PREV from "@/app/dashboard/public/My-Division/Prev.svg";
import ETH from "@/app/dashboard/public/Transactions/ETH.svg";
import USDT from "@/app/dashboard/public/Transactions/USDT.svg";
import { formatDate } from "@/app/dashboard/utils/formatDate";
import { formatAddress } from "@/app/dashboard/utils/formatAddress";
import { Transaction } from "@/app/dashboard/lib/transactionActions";

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <>
      <div className="table-gradient-container p-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
        <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead className="text-left">
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg">Date</th>
              <th className="text-[14px] md:text-base lg:text-lg">Code</th>
              <th className="text-[14px] md:text-base lg:text-lg">TX Hash</th>
              <th className="text-[14px] md:text-base lg:text-lg">
                Wallet Address
              </th>
              <th className="text-[14px] md:text-base lg:text-lg">Price</th>
              <th className="text-[14px] md:text-base lg:text-lg">
                <div className="inline-flex items-center gap-x-3">
                  <span>Paid</span>
                  <ARROW className="rotate-90" />
                </div>
              </th>
              <th className="text-[14px] md:text-base lg:text-lg">
                <div className="inline-flex items-center gap-x-3">
                  <span>Amount</span>
                  <ARROW className="rotate-90" />
                </div>
              </th>
              <th className="text-[14px] md:text-base lg:text-lg">
                <div className="inline-flex items-center gap-x-3">
                  <span>Payment</span>
                  <ARROW className="rotate-90" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {transactions?.map((transaction) => {
              return (
                <tr key={transaction.id} className="h-[80px]">
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    {transaction.code || "N/A"}
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    <div className="flex gap-x-1 items-center">
                      <span><a href={`https://sepolia.etherscan.io/tx/${transaction.tx_hash}`}>{formatAddress(transaction.tx_hash)}</a></span>
                    </div>
                  </td>
                  <td className="min-w-[140px] text-[14px] md:text-base lg:text-lg">
                    <div className="flex gap-x-1 items-center">
                      <span>{formatAddress(transaction.wallet_address)}</span>
                    </div>
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    {transaction.price}
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    {transaction.amount}
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    {transaction.amount}
                  </td>
                  <td className="min-w-[100px] text-[14px] md:text-base lg:text-lg">
                    <div className="flex gap-x-1 items-center">
                    
                        <USDT className="h-[22px] w-[22px] object-contain" />
                    
                      <span>{transaction.payment}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination - Update as needed */}
      <div className="mt-6 pagination-gradient-container md:min-w-[66%] lg:w-[40%] mx-auto py-2 px-4 md:py-3 md:px-4">
        <PREV />
        <ul className="flex gap-x-2 font-noto-serif">
          {/* Pagination items */}
          <li className="text-[14px] md:text-base lg:text-lg aspect-square w-[24px] lg:w-[36px] bg-slate-800 text-gray-50 flex justify-center items-center rounded-full">
            1
          </li>
          {/* Add more pagination items as necessary */}
        </ul>
        <NEXT />
      </div>
    </>
  );
};

export default TransactionTable;
