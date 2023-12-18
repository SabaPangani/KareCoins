import { useState } from "react";

const useInput = (validatorFunction: any) => {
  const [value, setValue] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const isValidInput = validatorFunction(value);

  const valueChangeHandler = (e: any) => {
    setValue(e.target.value);
  };

  return {
    value,
    isValidInput,
    isFormSubmitted,
    setIsFormSubmitted,
    valueChangeHandler,
  };
};

export default useInput;