import type { GreetApi } from "./greetTypes";

export type API_ENDPOINTS = "greet";

export interface ApiInstance
  extends Record<
    API_ENDPOINTS,
    {
      payload: unknown;
      response: unknown;
    }
  > {
  greet: GreetApi;
}
