import React from "react";

import { ButtonBase, ButtonProps } from "./ButtonBase";

export const ButtonHollow: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <ButtonBase colorClass="button-front-hollow" {...props} />;
};
