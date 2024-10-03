import type { GreetApi } from "$/apis/greetTypes";

export interface ApiInstance {
  greet: GreetApi;
}

export type API_ENDPOINTS = keyof ApiInstance;
