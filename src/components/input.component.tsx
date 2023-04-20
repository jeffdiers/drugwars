import {
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
} from "react";

type InputProps = {
  children: ReactElement | string | ReactNode;
  onKeyDown: (key: string) => void;
};

const Input: FC<InputProps> = ({ children, onKeyDown }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    onKeyDown(event.key);
  };

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div ref={inputRef} role="button" tabIndex={0} onKeyDown={handleOnKeyDown}>
      {children}
    </div>
  );
};

export default Input;
