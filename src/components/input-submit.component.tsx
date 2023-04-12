import { FC, FormEvent } from "react";

type SubmitInputProps = {
  name: string;
  labelText: string;
  handleValue: Function;
};

const SubmitInput: FC<SubmitInputProps> = ({
  name,
  labelText,
  handleValue,
}) => {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = Object.fromEntries(formData.entries())[name];

    handleValue(value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label>
        {labelText}
        <br />
        <input autoFocus name={name} />
      </label>
    </form>
  );
};

export default SubmitInput;
