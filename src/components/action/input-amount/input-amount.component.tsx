import { FC, FormEvent } from "react";
import Button from "../../button/button.component";
import Input from "../../input/input.component";

import { InputForm } from "./input-amount.styles";

type InputAmountProps = {
  name: string;
  labelText: string;
  handleValue: Function;
};

const InputAmount: FC<InputAmountProps> = ({
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
    <InputForm onSubmit={handleOnSubmit}>
      <label>{labelText}</label>
      <Input type="tel" autoFocus name={name} />
      <Button type="submit">submit</Button>
    </InputForm>
  );
};

export default InputAmount;
