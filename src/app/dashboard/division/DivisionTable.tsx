import React from "react";
import Image from "next/image";

const DivisionTable = () => {
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
          <tr className="border-b text-lg leading-6">
            <td className="p-5 pl-0">1</td>
            <td>
              <div>2051</div>
            </td>
            <td>
              <div>0x72bBdBbE5Cf18E36D5b5c758274A671b3b3eB95F</div>
            </td>
            <td>
              <div>Shinobi</div>
            </td>
          </tr>
          <tr className="border-b text-lg leading-6">
            <td className="p-5 pl-0">2</td>
            <td>
              <div>2052</div>
            </td>
            <td>
              <div>0x72bBdBbE5Cf18E36D5b5c758274A671b3b3eB95F</div>
            </td>
            <td>
              <div>Shinobi</div>
            </td>
          </tr>
          <tr className="border-b text-lg leading-6">
            <td className="p-5 pl-0">3</td>
            <td>
              <div>2053</div>
            </td>
            <td>
              <div>0x72bBdBbE5Cf18E36D5b5c758274A671b3b3eB95F</div>
            </td>
            <td>
              <div>Shinobi</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DivisionTable;
