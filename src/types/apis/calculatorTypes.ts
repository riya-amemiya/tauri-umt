export interface CalculatorPayload {
  expression: string;
}

type CalculatorSuccessResponse = [true, number];
type CalculatorFailureResponse = [false, string];

export type CalculatorResponse =
  | CalculatorSuccessResponse
  | CalculatorFailureResponse;

export interface CalculatorApi {
  payload: CalculatorPayload;
  response: CalculatorResponse;
}
