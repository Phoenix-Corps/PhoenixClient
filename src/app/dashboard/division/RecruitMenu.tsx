import React from "react";

type RecruitMenuProps = {
  onClose: () => void;
};

const RecruitMenu = ({ onClose }: RecruitMenuProps) => {
  return (
    <div
      className="table-gradient-container flex items-center justify-center mt-8 rounded-tl-[40px] md:rounded-tl-[60px] lg:rounded-tl-[80px] overflow-x-auto"
      style={{ padding: 0, borderWidth: 0 }}
    >
      <div className="w-1/3 p-4 text-center">
        <div className="text-4xl font-bold text-gray-800">32</div>
        <div className="text-gray-600 mb-8">Spendable XP</div>
        <div className="text-4xl font-bold text-gray-800">102</div>
        <div className="text-gray-600">Vouchers</div>
      </div>

      <div className="w-2/3 bg-gradient-to-r from-[#1F354F] to-[#28425D] p-6 d-flex flex-column items-center">
        <div className="space-y-4" style={{ display: "flex", flexDirection: "column" }}>
          <select className="p-3 rounded-lg bg-[#3F5269] text-white focus:outline-none" style={{ maxWidth: "300px", appearance: "none" }}>
            <option>Desired rank for new recruit</option>
            <option>Soldier (LVL1)</option>
            <option>Sergeant Major (LVL5)</option>
            <option>Colonel (LVL10)</option>
          </select>
          <input
            type="text"
            placeholder="New recruit's wallet address"
            className="p-3 rounded-lg bg-[#3F5269] text-white focus:outline-none"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <button className="button button-yellow w-full mt-4" style={{ maxWidth: "300px" }} onClick={onClose}>
          RECRUIT
        </button>
      </div>
    </div>
  );
};

export default RecruitMenu;
