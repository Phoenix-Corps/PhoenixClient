import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

type ButtonStateProps = ButtonProps & {
  enabled: boolean;
};

export const ButtonState: React.FC<ButtonStateProps> = (
  props: ButtonStateProps
) => {
  return (
    <ButtonBase
      colorClass={props.enabled ? "button-front-yellow" : "button-front-hollow"}
      {...props}
    />
  );
};
