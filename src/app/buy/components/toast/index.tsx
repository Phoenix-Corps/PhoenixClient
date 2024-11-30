import React, { useMemo } from "react";
import Image from "next/image";
import CloseButton from "@public/close-x.svg";

export interface ToastProps {
  message: string;
  txHash?: string;
  type: "success" | "error" | "info" | "warning";
  position:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  txHash,
  type = "success",
  position = "top-right",
  onClose
}) => {

  const typeStyles: Record<ToastProps["type"], string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black"
  };

  const positionStyles: Record<NonNullable<ToastProps["position"]>, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };

  const link = useMemo(() => {
    if (txHash) {
      return `https://polygonscan.com/tx/${txHash}`;
    } else {
      return "";
    }
  }, [txHash])

  return (
    <div
      className={`fixed z-50 p-4 rounded shadow-lg ${typeStyles[type]} ${positionStyles[position]} `}
    >
      <div>
        {message}
        &nbsp;
        View transaction on <a href={link} target="_blank"><b>poligonscan</b></a>.
      </div>
      <button onClick={onClose} className="absolute top-1 right-1 w-[15px] h-[15px]">
        <Image
          src='/close-x.svg'
          width={15}
          height={15}
          alt="project-logo"
        />
      </button>
    </div>
  );
};

export default Toast;
