import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "@/types/rocketApiSchema";

export const rocketApiFetchClient = createFetchClient<paths>({
  baseUrl:
    process.env.NEXT_PUBLIC_DEBUG_MODE === "true"
      ? "http://localhost:3001"
      : "https://rocket-study.oshaburikitchin.com/",
});

export const rocketApiQueryClient = createClient(rocketApiFetchClient);
