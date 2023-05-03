import { FC, ButtonHTMLAttributes } from "react";

import { BaseButton, SimpleButton } from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  simple = "simple",
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.simple]: SimpleButton,
  }[buttonType]);

const Button: FC<ButtonProps> = ({
  buttonType,
  children,
  onClick,
  type,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      onClick={(event) => {
        type !== "submit" && event.preventDefault();
        onClick && onClick(event);
      }}
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
