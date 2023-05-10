import type { FC, FormEvent } from "react";
import { useState } from "react";
import Button from "../../button/button.component";
import Input from "../../input/input.component";

import CurrencyInput from "react-currency-input-field";
import DialogBox from "../../dialog-box/dialog-box.component";

import { InputForm } from "./input-amount.styles";

type InputAmountProps = {
  name: string;
  type?: "currency" | "text" | "number";
  labelText: string;
  handleValue: Function;
  goBack?: Function;
};

const InputAmount: FC<InputAmountProps> = ({
  name,
  type = "number",
  labelText,
  handleValue,
  goBack,
}) => {
  const [inputValue, setinputValue] = useState<string | undefined>(undefined);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = Object.fromEntries(formData.entries())[name];

    type === "currency" ? handleValue(inputValue) : handleValue(value);
  };

  const getInputType = () => {
    switch (type) {
      case "currency":
        return (
          <CurrencyInput
            prefix="$"
            name={name}
            onValueChange={(value) => setinputValue(value)}
          />
        );

      case "text":
        return <Input autoFocus name={name} />;

      default:
        return <Input type="tel" autoFocus name={name} />;
    }
  };

  return (
    <InputForm onSubmit={handleOnSubmit}>
      <DialogBox>
        <label>{labelText}</label>
        {getInputType()}
        <Button type="submit">submit</Button>
        {goBack && <Button onClick={() => goBack()}>back</Button>}
      </DialogBox>
    </InputForm>
  );
};

export default InputAmount;
