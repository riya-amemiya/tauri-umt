import {
  invoke,
  type InvokeArgs,
  type InvokeOptions,
} from "@tauri-apps/api/core";

import type { API_ENDPOINTS, ApiInstance } from "../types/apis";

export const generateApiInstance = (apiName: API_ENDPOINTS) => {
  return async (
    payload: ApiInstance[typeof apiName]["payload"],
    options?: InvokeOptions,
  ): Promise<ApiInstance[typeof apiName]["response"]> => {
    return await invoke(apiName, payload as unknown as InvokeArgs, options);
  };
};
