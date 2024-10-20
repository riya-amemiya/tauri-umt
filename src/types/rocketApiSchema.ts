/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["index"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/calculator": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["calculator_index"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/getUuidV4": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_uuid_v4_handler"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/getUuidV7": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_uuid_v7_handler"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/getUuidsV4/{range}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_uuids_v4_handler"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/getUuidsV7/{range}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_uuids_v7_handler"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    GetCalculatorErrorResult: {
      error: string;
      success: boolean;
    };
    GetCalculatorSuccessResult: {
      /** Format: double */
      message: number;
      success: boolean;
    };
    GetUuidV4Result: {
      message: string;
    };
    GetUuidV7Result: {
      message: string;
    };
    GetUuidsV4Result: {
      messages: string[];
    };
    GetUuidsV7Result: {
      messages: string[];
    };
    IndexResult: {
      message: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Index result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IndexResult"][];
        };
      };
    };
  };
  calculator_index: {
    parameters: {
      query: {
        expression: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Get Calculator result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetCalculatorSuccessResult"];
        };
      };
      /** @description Bad request. */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetCalculatorErrorResult"];
        };
      };
    };
  };
  get_uuid_v4_handler: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Get UUID v4 result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetUuidV4Result"];
        };
      };
    };
  };
  get_uuid_v7_handler: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Get UUID v7 array result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetUuidV7Result"];
        };
      };
    };
  };
  get_uuids_v4_handler: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        range: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Get UUID v4 array result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetUuidsV4Result"];
        };
      };
    };
  };
  get_uuids_v7_handler: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        range: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Get UUID v7 result. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetUuidsV7Result"];
        };
      };
    };
  };
}
