import { Step } from "../interfaces/step.interface";

export const isValidInput = (input: string, step: Step): boolean => {
  if (step.validation) {
    return step.validation(input);
  }
  return true;
};
