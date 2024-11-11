import React, { useState } from "react";
import ArrowIcon from "@public/dashboard/Vector 1.svg";

type RecruitMenuProps = {
  onClose: () => void;
};

const RecruitMenu = ({ onClose }: RecruitMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState(
    "Desired rank for new recruit"
  );

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSelectRank = (rank: string) => {
    setSelectedRank(rank);
    setDropdownOpen(false);
  };

  return (
    <div
      className="table-gradient-container flex items-center justify-center mt-8 rounded-tl-[40px] md:rounded-tl-[60px] lg:rounded-tl-[80px] overflow-x-auto mx-auto"
      style={{ padding: 0, borderWidth: 0, maxWidth: "1030px" }}
    >
      <div className="w-1/3 p-4 text-center">
        <div className="text-4xl font-bold text-gray-800">32</div>
        <div className="text-gray-600 mb-8">Spendable XP</div>
        <div className="text-4xl font-bold text-gray-800">102</div>
        <div className="text-gray-600">Vouchers</div>
      </div>

      <div className="w-2/3 bg-gradient-to-r from-[#1F354F] to-[#28425D] p-6 flex flex-col items-center">
        <div
          className="space-y-4 flex flex-col items-center"
          style={{ width: "100%" }}
        >
          <div
            className="p-3 bg-[#3F5269] text-white cursor-pointer outline outline-white outline-1 outline-offset-1 rounded-tl-lg rounded-tr-lg flex justify-between items-center"
            style={{
              maxWidth: "500px",
              width: "100%",
              borderBottomLeftRadius: dropdownOpen ? 0 : "0.5rem",
              borderBottomRightRadius: dropdownOpen ? 0 : "0.5rem",
              marginBottom: dropdownOpen ? 0 : undefined
            }}
            onClick={handleDropdownToggle}
          >
            <div>{selectedRank}</div>
            <ArrowIcon
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              style={{ marginLeft: "auto" }}
            />
          </div>

          {dropdownOpen && (
            <div
              className="bg-[#1F354F] rounded-bl-lg rounded-br-lg shadow-lg outline outline-white outline-1 outline-offset-1"
              style={{
                maxWidth: "500px",
                width: "100%",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: 0
              }}
            >
              <div
                className="p-3 text-white hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
                onClick={() => handleSelectRank("Soldier (LVL1)")}
              >
                Soldier (LVL1)
              </div>
              <div
                className="p-3 text-white hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
                onClick={() => handleSelectRank("Sergeant Major (LVL5)")}
              >
                Sergeant Major (LVL5)
              </div>
              <div
                className="p-3 text-white hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
                onClick={() => handleSelectRank("Colonel (LVL10)")}
              >
                Colonel (LVL10)
              </div>
            </div>
          )}

          <input
            type="text"
            placeholder="New recruit's wallet address"
            className="p-3 rounded-lg bg-[#3F5269] text-white focus:outline-none outline outline-white outline-1 outline-offset-1"
            style={{ maxWidth: "500px", width: "100%" }}
          />
        </div>

        <button
          className="button button-yellow w-full mt-4"
          style={{ maxWidth: "500px", width: "100%" }}
          onClick={onClose}
        >
          NEW RECRUIT
        </button>
      </div>
    </div>
  );
};

export default RecruitMenu;
