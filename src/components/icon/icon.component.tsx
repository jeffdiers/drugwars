import type { FC } from "react";

import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg";

import { BaseIcon, InvertedIcon } from "./icon.styles";

export enum ICON_TYPE_CLASSES {
  base = "base",
  inverted = "inverted",
}

export enum ICON_NAME {
  home = "home",
}

export type IconProps = {
  iconType?: ICON_TYPE_CLASSES;
  iconName: ICON_NAME;
};

const getIconContainer = (iconType = ICON_TYPE_CLASSES.base): typeof BaseIcon =>
  ({
    [ICON_TYPE_CLASSES.base]: BaseIcon,
    [ICON_TYPE_CLASSES.inverted]: InvertedIcon,
  }[iconType]);

const getIcon = (iconName: ICON_NAME): typeof HomeIcon =>
  ({
    [ICON_NAME.home]: HomeIcon,
  }[iconName]);

const Button: FC<IconProps> = ({ iconType, iconName }) => {
  const IconContainer = getIconContainer(iconType);
  const Icon = getIcon(iconName);
  return (
    <IconContainer>
      <Icon />
    </IconContainer>
  );
};

export default Button;
