import { useState } from "react";

import Icon_Dropdown from "@public/icons/dropdown.svg";

type Props = {
  options: string[];
  placeholder?: string;
  onSelect?: (index: number) => void;
};

export const Select: React.FC<Props> = (props: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSelect = (index: number) => {
    props.onSelect?.(index);
    setDropdownOpen(false);
  };

  return (
    <div className="relative space-y-4 flex flex-col items-center">
      <div
        className="p-3 bg-[transparent] text-white cursor-pointer outline outline-white outline-1 outline-offset-1 rounded-tl-lg rounded-tr-lg flex justify-between items-center"
        style={{
          borderBottomLeftRadius: dropdownOpen ? 0 : "0.5rem",
          borderBottomRightRadius: dropdownOpen ? 0 : "0.5rem",
          marginBottom: dropdownOpen ? 0 : undefined
        }}
        onClick={handleDropdownToggle}
      >
        <div>{props.placeholder ?? ""}</div>
        <Icon_Dropdown
          className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          style={{ marginLeft: "auto" }}
        />
      </div>

      {dropdownOpen && (
        <div
          className="absolute right-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-non" //absolute right-0 z-10 mt-2 w-56 origin-top-right bg-[transparent] rounded-bl-lg rounded-br-lg shadow-lg outline outline-white outline-1 outline-offset-1"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: 0
          }}
        >
          <div className="py-1">
            {props.options.map((text, index) => {
              return (
                <div
                  className="p-3 text-white hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
                  onClick={() => handleSelect(index)}
                >
                  {text}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
