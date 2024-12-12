import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

export const ButtonYellow: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <ButtonBase colorClass="button-front-yellow" {...props} />;
};
