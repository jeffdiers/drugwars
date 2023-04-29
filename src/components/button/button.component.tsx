import { FC, ButtonHTMLAttributes } from "react";

import { ButtonBase } from "./button.styles";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return <ButtonBase {...otherProps}>{children}</ButtonBase>;
};

export default Button;
