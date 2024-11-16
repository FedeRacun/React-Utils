export interface Step {
  id: string;
  question: string;
  validation?: (input: string) => boolean;
  errorMessage?: string;
}
