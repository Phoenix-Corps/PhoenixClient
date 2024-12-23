"use client";

import { Logo } from "@/components/Page/Logo";
import { ButtonConnect } from "@/components/Buttons/ButtonConnect";
import { ButtonMenu } from "../Buttons/ButtonMenu";

export const Header = () => {
  return (
    <header className="p-10">
      <div className="absolute top-10 left-10">
        <Logo width={162} />
      </div>

      <div className="absolute top-0 right-3 flex gap-3">
        <ButtonMenu />
        <ButtonConnect />
      </div>
    </header>
  );
};
