"use client";
import React, { useState } from "react";
import Image from "next/image";
import USD from "../public/usd-coin.svg";
import Vector_1 from "@/../public/Vector 1.svg";
type Props = {};

const BuyPage = (props: Props) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [codeValue, setCodeValue] = useState<string | null>(null);
  const dropDown = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="voucher-wrapper ">
        <div className="voucher-text-input-wrapper">
          <div className="buy-heading-text">VOUCHER PURCHASE</div>
          <div className="buy-main-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitati.
          </div>
          <div className="relative buy-wrapper-main">
            <input
              className="buy-input-main"
              value={amount ?? ""}
              placeholder="0.00"
              onChange={(e: any) => setAmount(e.target.value || null)}
            />
            <div className="curr-drop-wrapper">
              <div
                className="curr-main flex flex-row items-center"
                onClick={dropDown}
              >
                <USD alt="usd" width={54} height={54} />
                <div>USDC</div>

                <Vector_1 alt="vector_1" width={26} height={7} />
              </div>
            </div>
            {showDropDown && (
              <div className="drop-down-wrapper">
                <div
                  className="drop-item flex flex-row items-center"
                  onClick={dropDown}
                >
                  <USD alt="usd" width={54} height={54} />
                  <div>USDC</div>
                </div>
                <div
                  className="drop-item flex flex-row items-center"
                  onClick={dropDown}
                >
                  <USD alt="usd" width={54} height={54} />
                  <div>USDC</div>
                </div>
                <div
                  className="drop-item flex flex-row items-center"
                  onClick={dropDown}
                >
                  <USD alt="usd" width={54} height={54} />
                  <div>USDC</div>
                </div>
                <div
                  className="drop-item flex flex-row items-center w-"
                  onClick={dropDown}
                >
                  <USD alt="usd" width={54} height={54} />
                  <div>USDC</div>
                </div>
              </div>
            )}
          </div>
          <button className="buy-button flex justify-center items-center">
            BUY
          </button>
        </div>
        <div className="voucher-image-right relative overflow-hidden">
          <div className="voucher-text-in-image">
            <div className="currency-and-text">
              <div className="voucher-text-number font-extrabold z-10">0</div>
              <div className="voucher-text-text">VOUCHERS</div>
            </div>
            <div className="change-rate-text">2 VoucherS = 1 USDC</div>
          </div>
          <div className="voucher-phoenix-image"></div>
        </div>
      </div>
      <input className="buy-input-main code-input" value="CODE24" />
      <div className="text-under-code">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
      </div>
    </div>
  );
};

export default BuyPage;
