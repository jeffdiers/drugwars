import { FC, KeyboardEvent, useRef, useEffect } from "react";

type InputConfirmProps = {
  labelText: string;
  handleYes: Function;
  handleNo: Function;
};

const InputConfirm: FC<InputConfirmProps> = ({
  labelText,
  handleYes,
  handleNo,
}) => {
  const isYesNo = (event: KeyboardEvent) => {
    return event.key === "y" || event.key === "n";
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (isYesNo(event)) {
      if (event.key === "y") handleYes();
      if (event.key === "n") handleNo();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div ref={inputRef} role="input" tabIndex={0} onKeyDown={handleOnKeyDown}>
      {labelText}
    </div>
  );
};

export default InputConfirm;
