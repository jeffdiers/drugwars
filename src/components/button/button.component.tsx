import { FC, ButtonHTMLAttributes } from "react";

import { ButtonBase } from "./button.styles";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <ButtonBase
      onClick={(event) => {
        event.preventDefault();
        onClick && onClick(event);
      }}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
