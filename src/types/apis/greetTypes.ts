export interface GreetPayload {
  name: string;
}

export type GreetResponse = string;

export interface GreetApi {
  payload: GreetPayload;
  response: GreetResponse;
}
