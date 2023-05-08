import type { FC, FormEvent } from "react";
import { useState } from "react";
import Button from "../../button/button.component";
import Input from "../../input/input.component";

import CurrencyInput from "react-currency-input-field";
import DialogBox from "../../dialog-box/dialog-box.component";

import { InputForm } from "./input-amount.styles";

type InputAmountProps = {
  name: string;
  type?: "currency";
  labelText: string;
  handleValue: Function;
};

const InputAmount: FC<InputAmountProps> = ({
  name,
  type,
  labelText,
  handleValue,
}) => {
  const [inputValue, setinputValue] = useState<string | undefined>(undefined);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = Object.fromEntries(formData.entries())[name];

    type === "currency" ? handleValue(inputValue) : handleValue(value);
  };

  return (
    <InputForm onSubmit={handleOnSubmit}>
      <DialogBox>
        <label>{labelText}</label>
        {type === "currency" ? (
          <CurrencyInput
            prefix="$"
            name={name}
            onValueChange={(value) => setinputValue(value)}
          />
        ) : (
          <Input type="tel" autoFocus name={name} />
        )}
        <Button type="submit">submit</Button>
      </DialogBox>
    </InputForm>
  );
};

export default InputAmount;
