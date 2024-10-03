import {
  invoke,
  type InvokeArgs,
  type InvokeOptions,
} from "@tauri-apps/api/core";

import type { API_ENDPOINTS, ApiInstance } from "$/apis";

export const generateAppApiInstance = <T extends API_ENDPOINTS>(apiName: T) => {
  return async (
    payload: ApiInstance[typeof apiName]["payload"],
    options?: InvokeOptions,
  ): Promise<ApiInstance[typeof apiName]["response"]> => {
    return await invoke(apiName, payload as unknown as InvokeArgs, options);
  };
};
