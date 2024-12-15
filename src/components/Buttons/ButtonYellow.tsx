import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

export const ButtonYellow: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ButtonBase
      {...props}
      className={`button-front-yellow ${props.className ?? ""}`}
    />
  );
};
