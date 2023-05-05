import type { FC, InputHTMLAttributes } from "react";

import { InputBase } from "./input.styles";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...otherProps
}) => {
  return <InputBase {...otherProps}>{children}</InputBase>;
};

export default Input;
