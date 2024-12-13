"use client";

import React from "react";

import { Logo } from "@/components/Logo";
import { ButtonConnect } from "./Buttons/ButtonConnect";

export const Header = () => {
  return (
    <div className="p-10">
      <div className="absolute top-10 left-10">
        <Logo width={162} />
      </div>
      <ButtonConnect />
    </div>
  );
};
