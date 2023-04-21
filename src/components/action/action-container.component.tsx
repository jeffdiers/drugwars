import { FC, useEffect, ReactElement, ReactNode } from "react";

type ActionContainerProps = {
  children: ReactElement | string | ReactNode;
  onKeyDown: (key: string) => void;
};

const ActionContainer: FC<ActionContainerProps> = ({ children, onKeyDown }) => {
  const handleOnKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    onKeyDown(event.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyDown);
    return () => document.removeEventListener("keydown", handleOnKeyDown);
  });

  return <div role="dialog">{children}</div>;
};

export default ActionContainer;
