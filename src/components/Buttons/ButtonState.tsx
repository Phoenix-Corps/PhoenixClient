import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

type ButtonStateProps = ButtonProps & {
  enabled: boolean;
  className?: string;
};

export const ButtonState: React.FC<ButtonStateProps> = (
  props: ButtonStateProps
) => {
  return (
    <ButtonBase
      {...props}
      className={`${
        props.enabled ? "button-front-yellow" : "button-front-hollow"
      } ${props.className ?? ""}`}
    />
  );
};
