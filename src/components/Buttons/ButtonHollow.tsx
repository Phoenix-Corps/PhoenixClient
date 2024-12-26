import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

export const ButtonHollow: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ButtonBase
      {...props}
      className={`button-front-hollow ${props.className ?? ""}`}
    />
  );
};
