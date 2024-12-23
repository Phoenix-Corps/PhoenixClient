import { useState } from "react";

import { useFloating, autoUpdate } from "@floating-ui/react";
import { FloatingPortal } from "@floating-ui/react";

import Icon_Dropdown from "@public/icons/dropdown.svg";

import styles from "./Inputs.module.css";

type Props = {
  options: string[];
  placeholder?: string;
  onSelect?: (index: number) => void;
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
        className={`p-3 bg-[transparent] text-white cursor-pointer outline outline-white outline-1 rounded-tl-lg rounded-tr-lg flex justify-between items-center gap-2`}
        style={{
          borderBottomLeftRadius: isOpen ? 0 : "0.5rem",
          borderBottomRightRadius: isOpen ? 0 : "0.5rem",
          marginBottom: isOpen ? 0 : undefined
        }}
      >
        <div className="opacity-60">{props.placeholder ?? ""}</div>
        <Icon_Dropdown style={{ marginLeft: "auto" }} />
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`fixed top-0 left-0 w-max outline outline-white outline-1 color_accent bg-white rounded`}
          >
            {props.options.map((text, index) => {
              return (
                <div
                  className="p-3 hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
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
