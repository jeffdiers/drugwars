import { FC, ButtonHTMLAttributes } from "react";

import { ButtonBase } from "./button.styles";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  type,
  ...otherProps
}) => {
  return (
    <ButtonBase
      onClick={(event) => {
        type !== "submit" && event.preventDefault();
        onClick && onClick(event);
      }}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
