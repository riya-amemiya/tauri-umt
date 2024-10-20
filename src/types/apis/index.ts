import type { CalculatorApi } from "@/types/apis/calculatorTypes";

export interface ApiInstance {
  calculator: CalculatorApi;
}

export type API_ENDPOINTS = keyof ApiInstance;
