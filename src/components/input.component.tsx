import {
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
} from "react";

type InputProps = {
  children: ReactElement | string | ReactNode;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

const Input: FC<InputProps> = ({ children, onKeyDown }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div ref={inputRef} role="input" tabIndex={0} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
};

export default Input;
