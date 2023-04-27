import { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return <button {...otherProps}>{children}</button>;
};

export default Button;
