import { useState } from "react";

import { useFloating, autoUpdate } from "@floating-ui/react";
import { FloatingPortal } from "@floating-ui/react";

import Icon_Dropdown from "@public/icons/dropdown.svg";

import styles from "./Inputs.module.css";

type Props = {
  selectedIndex?: number;
  options: string[];
  placeholder?: string;
  onSelect?: (index: number) => void;
  className?: string;
};

export const Select: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
    strategy: "absolute"
  });

  const handleSelect = (index: number) => {
    props.onSelect?.(index);
    setIsOpen(false);
  };
  const handleToggleDropDown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div
        ref={refs.setReference}
        onClick={handleToggleDropDown}
        className={`p-3 bg-[transparent] color_textAccent cursor-pointer outline outline-white outline-1 rounded-tl-lg rounded-lg flex justify-between items-center gap-2 ${
          props.className || ""
        }`}
      >
        {props.selectedIndex !== undefined ? (
          props.options[props.selectedIndex] || ""
        ) : (
          <div className="inputPlaceholder">{props.placeholder ?? ""}</div>
        )}
        <Icon_Dropdown style={{ marginLeft: "auto" }} />
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`fixed din top-0 left-0 w-max outline outline-white outline-1 color_textAccent card-box rounded`}
          >
            {props.options.map((text, index) => {
              return (
                <div
                  key={index}
                  className="p-3 hover:bg-[#3F526933] cursor-pointer flex justify-center items-center"
                  onClick={() => handleSelect(index)}
                >
                  {text}
                </div>
              );
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
