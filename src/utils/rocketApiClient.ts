import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "@/types/rocketApiSchema";

export const rocketApiFetchClient = createFetchClient<paths>({
  baseUrl: "https://rocket-study.oshaburikitchin.com/",
});

export const rocketApiQueryClient = createClient(rocketApiFetchClient);
